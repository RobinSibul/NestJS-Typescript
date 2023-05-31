import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    BadRequestException,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse
} from '@nestjs/swagger';
import { Secured, LoggedInUser } from '@rfx/nst-permissions';
import {
    Permission,
    UserProfile,
    FullUser,
    Variety,
    ListVariety,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    UploadedFileObject,
    BaseRate
} from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { VarietyService } from '@nst-smc/dal';
import { IdDto, parseObjectId } from '@rfx/nst-db/mongo';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { VarietyDto } from './dto/variety.dto';
import { VarietyParamsDto } from './dto/variety-params.dto';
import { BaseRateDto } from './dto/base-rate.dto';

@Controller('variety')
export class VarietyController {
    constructor(
        private readonly _varietyService: VarietyService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Variety' })
    @ApiCreatedResponse({ description: 'Variety', type: ObjectId })
    @Secured(Permission.VarietyCreate)
    @UseInterceptors(FilesInterceptor('images[]'))
    public async createVariety(
        @Body() dto: VarietyDto,
        @UploadedFiles() images: UploadedFileObject[],
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._varietyService.createVariety(dto, images, lUser, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'Variety List',
        description: 'List Variety'
    })
    @ApiOkResponse({
        description: 'Paginated list of Variety',
        type: [Variety]
    })
    @Secured(Permission.VarietyView)
    public async listGrid(
        @Body() dto: VarietyParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<ListVariety>> {
        return await this._varietyService.getGridVariety(
            dto.toVarietyGridParams(),
            rEnt
        );
    }


    @Post('count')
    @ApiOperation({
        title: 'Variety Count',
        description: 'Count Variety'
    })
    @ApiOkResponse({
        description: 'Count of Variety',
        type: [Variety]
    })
    @Secured(Permission.VarietyView)
    public async countVariety(
        @Body() dto: VarietyParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Object> {
        return await this._varietyService.getVarietyCount(
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Variety Selection List',
        description: 'List of varieties for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of variety select options'
    })
    @Secured(Permission.VarietyView)
    public async getVarietySelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._varietyService.getVarietySelectOptions(
            rEnt
        );
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Variety by Id' })
    @Secured(Permission.VarietyView)
    public async getVariety(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Variety> {
        return this._varietyService.getVarietyById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Variety' })
    @Secured(Permission.VarietyEdit)
    @UseInterceptors(FilesInterceptor('images[]'))
    public async editVariety(
        @Param() idDto: IdDto,
        @Body() dto: VarietyDto,
        @UploadedFiles() images: UploadedFileObject[],
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._varietyService.editVariety(idDto.id, dto, images, lUser, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Variety' })
    @Secured(Permission.VarietyDelete)
    public async deleteVariety(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._varietyService.deleteVariety(idDto.id, rEnt);
    }

    @Post(':id/baseRate')
    @ApiOperation({ title: 'Create Base Rate' })
    @Secured(Permission.VarietyEdit)
    public async createBaseRate(
        @Param() idDto: IdDto,
        @Body() dto: BaseRateDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<BaseRate> { // front end needs more than just object id
        return this._varietyService.createBaseRate(idDto.id, dto, rEnt);
    }

    @Put(':vId/baseRate/:bId')
    @ApiOperation({ title: 'Edit Base Rate' })
    @Secured(Permission.VarietyEdit)
    public async editBaseRate(
        @Param('vId') vId: ObjectId,
        @Param('bId') bId: ObjectId,
        @Body() dto: BaseRateDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<BaseRate> { // front end needs more than just object id
        let varietyId, baseRateId;
        try {
            varietyId = parseObjectId(vId);
            baseRateId = parseObjectId(bId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._varietyService.editBaseRate(varietyId, baseRateId, dto, rEnt);
    }

    @Delete(':vId/baseRate/:bId')
    @ApiOperation({ title: 'Delete Base Rate' })
    @Secured(Permission.VarietyEdit)
    public async deleteBaseRate(
        @Param('vId') vId: ObjectId,
        @Param('bId') bId: ObjectId,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let varietyId, baseRateId;
        try {
            varietyId = parseObjectId(vId);
            baseRateId = parseObjectId(bId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._varietyService.deleteBaseRate(varietyId, baseRateId, rEnt);
    }
}
