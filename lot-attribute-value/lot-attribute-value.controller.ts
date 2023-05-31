import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { IdDto } from '@rfx/nst-db/mongo';
import { Secured } from '@rfx/nst-permissions';
import { EnterpriseIdentity, LotAttribute, RequestEnterprise } from '@smc/api-common';
import { Permission } from '@smc/common';
import { LotAttributeService } from '../../dal/lot-attribute-dal/lot-attribute.service';
import { LotAttributeParamsDto } from './dto/lot-attribute-value-params.dto';
import { LotAttributeDto } from './dto/lot-attribute-value.dto';

@Controller('lot-attribute')
export class LotAttributeValueController {
    constructor(private readonly _lotAttributeService: LotAttributeService) {}

    @Post('list')
    @ApiOperation({
        title: 'Lot Attribute List',
        description: 'List Lot Attributes'
    })
    @ApiOkResponse({
        description: 'Paginated list of Lot Attributes',
        type: [LotAttribute]
    })
    @Secured(Permission.LotAttributeView)
    public async listGrid(
        @Body() dto: LotAttributeParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<LotAttribute>> {
        return this._lotAttributeService.getGridLotAttribute(dto.toLotAttributeGridParams(), rEnt);
    }

    @Post('')
    @ApiOperation({ title: 'Create Lot Attribute' })
    @ApiCreatedResponse({ description: 'Lot Attribute', type: ObjectId })
    @Secured(Permission.LotAttributeCreate)
    public async createLotAttribute(
        @Body() dto: LotAttributeDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._lotAttributeService.createLotAttribute(dto, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Lot Attribute By Id' })
    @Secured(Permission.LotAttributeView)
    public async getLotAttribute(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<LotAttribute> {
        return this._lotAttributeService.getLotAttributeById(idDto.id, rEnt);
    }

    @Get('selectOptions')
    @ApiOperation({
        title: 'Lot Attribute Selection List',
        description: 'List of Lot Attributes for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of Lot Attribute Select Options'
    })
    @Secured(Permission.LotAttributeView)
    public async getLotAttributeSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._lotAttributeService.getLotAttributeSelectOptions(rEnt);
    }

    @Get('')
    @ApiOperation({ title: 'Get All Lot Attributes' })
    @Secured(Permission.LotAttributeView)
    public async getAllLotAttributes(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<LotAttribute[]> {
        return this._lotAttributeService.getAllLotAttributes(rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Lot Attribute' })
    @Secured(Permission.LotAttributeEdit)
    public async editLotAttribute(
        @Param() idDto: IdDto,
        @Body() dto: LotAttributeDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._lotAttributeService.editLotAttribute(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Lot Attribute By Id' })
    @Secured(Permission.LotAttributeDelete)
    public async deleteLotAttribute(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._lotAttributeService.deleteLotAttributeById(idDto.id, rEnt);
    }
}
