import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    BadRequestException,
    ForbiddenException
} from '@nestjs/common';
import {
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse
} from '@nestjs/swagger';
import { Secured, LoggedInUser, WildCardPermission } from '@rfx/nst-permissions';
import {
    Permission,
    UserProfile,
    FullUser,
    Tag,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    DbCollection
} from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { TagService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { TagParamsDto } from './dto/tag-params.dto';
import { TagPushDto } from './dto/tag-push.dto';
import { TagPullDto } from './dto/tag-pull.dto';

@Controller('tag')
export class TagController {
    private readonly _tagPermissions: { [key: string]: Permission } = {
        [DbCollection.Area]: Permission.CountryEdit,
        [DbCollection.Country]: Permission.CountryEdit
    };

    constructor(
        private readonly _tagService: TagService
    ) {}

    @Post('list')
    @ApiOperation({
        title: 'Tag List',
        description: 'List Tag'
    })
    @ApiOkResponse({
        description: 'Paginated list of Tag',
        type: [Tag]
    })
    @Secured(Permission.TagView)
    public async listGrid(
        @Body() dto: TagParamsDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<PaginatedListModel<Tag>> {
        return await this._tagService.getGridTags(
            dto.toTagGridParams(),
            rEnterprise
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Tag Selection List',
        description: 'List of tag for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of tag select options'
    })
    @Secured(Permission.TagView)
    public async getTagSelectOptions(
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._tagService.getTagSelectOptions(
            rEnterprise
        );
    }

    @Post('/push')
    @ApiOperation({ title: 'Push tag onto document' })
    @Secured(WildCardPermission)
    public async pushTagOntoDocument(
        @Body() dto: TagPushDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity,
    ): Promise<ObjectId> {
        const reqdPerm = this._tagPermissions[dto.docCollection];
        if (!reqdPerm) {
            throw new BadRequestException('Not taggable');
        }
        if (!lUser.permissions.includes(reqdPerm)) {
            throw new ForbiddenException();
        }
        return this._tagService.pushTagOntoDocument(dto, rEnt);
    }

    @Post('/pull')
    @ApiOperation({ title: 'Pull tag from document' })
    @Secured(WildCardPermission)
    public async pullTagFromDocument(
        @Body() dto: TagPullDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        const reqdPerm = this._tagPermissions[dto.docCollection];
        if (!reqdPerm) {
            throw new BadRequestException('Not taggable');
        }
        if (!lUser.permissions.includes(reqdPerm)) {
            throw new ForbiddenException();
        }
        return this._tagService.pullTagFromDocument(dto, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Tag by Id' })
    @Secured(Permission.TagView)
    public async getTag(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<Tag> {
        return this._tagService.getTagById(
            idDto.id,
            rEnterprise
        );
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Tag' })
    @Secured(Permission.TagDelete)
    public async deleteTag(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._tagService.deleteTag(idDto.id, rEnt);
    }
}
