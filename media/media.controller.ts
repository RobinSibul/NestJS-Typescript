import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Body,
    BadRequestException,
    ForbiddenException
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Secured, WildCardPermission, LoggedInUser } from '@rfx/nst-permissions';
import {
    Media,
    MediaDocument,
    Permission,
    DbCollection,
    RequestEnterprise,
    EnterpriseIdentity,
    User
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { MediaService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { ForDocumentDto } from './dto/for-document.dto';

@Controller('media')
export class MediaController {
    private readonly _viewMediaPermissions: { [key: string]: Permission } = {
        [DbCollection.Variety]: Permission.VarietyView
    };
    private readonly _deleteMediaPermissions: { [key: string]: Permission } = {
        [DbCollection.Variety]: Permission.VarietyEdit
    };

    constructor(private readonly _mediaService: MediaService) {}

    @Post('latest')
    @ApiOperation({ title: 'Get latest media docs for document' })
    @Secured(WildCardPermission)
    public async getLatestMediaDocsForDocument(
        @Body() dto: ForDocumentDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<MediaDocument[]> {
        const reqdPermission = this._viewMediaPermissions[dto.collection];
        if (!reqdPermission) {
            throw new BadRequestException('No media for this type');
        }
        if (!lUser.permissions.includes(reqdPermission)) {
            throw new ForbiddenException();
        }
        return this._mediaService.getLatestMediaDocsForDocument(
            dto.collection,
            dto.documentId,
            rEnt
        );
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete media' })
    @Secured(WildCardPermission)
    public async deleteMedia(
        @Param() idDto: IdDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        //TODO: The service function for deleteMedia hasn't been created yet.
        //return this._mediaService.deleteMedia(idDto.id, lUser, rEnt, this._deleteMediaPermissions);
    }
}
