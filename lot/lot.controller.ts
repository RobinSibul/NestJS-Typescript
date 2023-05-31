import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Secured } from '@rfx/nst-permissions';
import { Permission, Lot, LotStatus, RequestEnterprise, EnterpriseIdentity } from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { LotService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { LotParamsDto } from './dto/lot-params.dto';
import { WeightChangeDto } from './dto/weight-change.dto';

@Controller('lot')
export class LotController {
    constructor(private readonly _lotService: LotService) {}
    /*
        Lot CRUD operations are handled through the
        grower contract controller and dal
    */
    @Post('list')
    @ApiOperation({
        title: 'Lot List',
        description: 'List Lot'
    })
    @ApiOkResponse({
        description: 'Paginated list of Lot',
        type: [Lot]
    })
    @Secured(Permission.LotView)
    public async listGrid(
        @Body() dto: LotParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Lot>> {
        return this._lotService.getGridLot(dto.toLotGridParams(), rEnt);
    }

    @Post('changeWeight/:id')
    @ApiOperation({ title: 'Edit Lot Weight' })
    @Secured(Permission.LotEdit)
    public async changeWeight(
        @Param() idDto: IdDto,
        @Body() dto: WeightChangeDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._lotService.changeWeight(idDto.id, dto, rEnt);
    }

    @Get('record/:id')
    @ApiOperation({ title: 'Get Lot By Id' })
    @ApiOkResponse({ description: 'List of lot Select Options' })
    @Secured(Permission.LotView)
    public async getLotById(@Param() idDto: IdDto, @RequestEnterprise() rEnt): Promise<Lot> {
        return this._lotService.getLotById(idDto.id, rEnt);
    }

    @Get('selectOptions')
    @ApiOperation({ title: 'Lot Selection List' })
    @ApiOkResponse({ description: 'List of lot Select Options' })
    @Secured(Permission.LotView)
    public async getLotSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._lotService.getLotSelectOptions(rEnt);
    }

    @Post('cropProductionReport')
    @ApiOperation({ title: 'Generate Crop Production Report' })
    @ApiCreatedResponse({ description: 'Report CSV', type: String })
    @Secured(Permission.LotView)
    public async generateCropProductionReport(
        @Body() dto: LotParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<string> {
        return this._lotService.getCropProductionReportCsv(dto.toLotGridParams(), rEnt);
    }

    @Post('changeLotStatus/:id')
    @ApiOperation({ title: 'Edit Lot Status' })
    @Secured(Permission.LotEdit)
    public async changeLotStatus(
        @Param() idDto: IdDto,
        @Body() dto: { lotStatus: LotStatus },
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._lotService.changeLotStatus(idDto.id, dto, rEnt);
    }
}
