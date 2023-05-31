import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    Query,
    BadRequestException
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Secured, LoggedInUser } from '@rfx/nst-permissions';
import {
    Permission,
    UserProfile,
    FullUser,
    Kind,
    User,
    RequestEnterprise,
    EnterpriseIdentity
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { KindService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { KindDto } from './dto/kind.dto';
import { KindParamsDto } from './dto/kind-params.dto';

@Controller('kind')
export class KindController {
    constructor(private readonly _kindService: KindService) {}

    @Post('')
    @ApiOperation({ title: 'Create Kind' })
    @ApiCreatedResponse({ description: 'Kind', type: ObjectId })
    @Secured(Permission.KindCreate)
    public async createKind(
        @Body() dto: KindDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._kindService.createKind(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'Kind List',
        description: 'List Kind'
    })
    @ApiOkResponse({
        description: 'Paginated list of Kind',
        type: [Kind]
    })
    @Secured(Permission.KindView)
    public async listGrid(
        @Body() dto: KindParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Kind>> {
        return await this._kindService.getGridKind(dto.toKindGridParams(), rEnt);
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Kind Selection List',
        description: 'List of kind for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of kind select options'
    })
    @Secured(Permission.KindView)
    public async getKindSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity,
        @Query('speciesId') sId: string = null,
        @Query('speciesClassId') sClassId: string = null
    ): Promise<SelectOption<ObjectId>[]> {
        let speciesId,
            speciesClassId = null;
        if (sId) {
            try {
                speciesId = parseObjectId(sId);
            } catch (e) {
                throw new BadRequestException('Invalid Id');
            }
        }
        if (sClassId) {
            try {
                speciesClassId = parseObjectId(sClassId);
            } catch (e) {
                throw new BadRequestException('Invalid Id');
            }
        }
        return this._kindService.getKindSelectOptions(rEnt, speciesId, speciesClassId);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Kind by Id' })
    @Secured(Permission.KindView)
    public async getKind(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Kind> {
        return this._kindService.getKindById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Kind' })
    @Secured(Permission.KindEdit)
    public async editKind(
        @Param() idDto: IdDto,
        @Body() dto: KindDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._kindService.editKind(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Kind By Id' })
    @Secured(Permission.KindDelete)
    public async deleteKind(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        await this._kindService.deleteKindById(idDto.id, rEnt);
    }
}
