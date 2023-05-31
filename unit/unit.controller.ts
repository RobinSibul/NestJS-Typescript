import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete
} from '@nestjs/common';
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
    WeightUnit,
    SurfaceUnit,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    LengthUnit
} from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { UnitService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { LengthUnitDto} from './dto/length-unit.dto'
import { SurfaceUnitDto } from './dto/surface-unit.dto';
import { SurfaceUnitParamsDto } from './dto/surface-unit-params.dto';
import { WeightUnitDto } from './dto/weight-unit.dto';
import { WeightUnitParamsDto } from './dto/weight-unit-params.dto';
import { LengthUnitParamsDto } from './dto/length-unit-params.dto';

@Controller('unit')
export class UnitController {
    constructor(
        private readonly _unitService: UnitService
    ) {}

    @Post('/weight')
    @ApiOperation({ title: 'Create Weight Unit' })
    @ApiCreatedResponse({ description: 'Weight Unit', type: ObjectId })
    @Secured(Permission.WeightUnitCreate)
    public async createWeightUnit(
        @Body() dto: WeightUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._unitService.createWeightUnit(dto, rEnt);
    }

    @Post('/surface')
    @ApiOperation({ title: 'Create Surface Unit' })
    @ApiCreatedResponse({ description: 'Surface Unit', type: ObjectId })
    @Secured(Permission.SurfaceUnitCreate)
    public async createSurfaceUnit(
        @Body() dto: SurfaceUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._unitService.createSurfaceUnit(dto, rEnt);
    }

    @Post('/length')
    @ApiOperation({ title: 'Create Length Unit' })
    @ApiCreatedResponse({ description: 'Length Unit', type: ObjectId })
    @Secured(Permission.LengthUnitCreate)
    public async createLengthUnit(
        @Body() dto: LengthUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._unitService.createLengthUnit(dto, rEnt);
    }

    @Get('/weight/selectOptions')
    @ApiOperation({
        title: 'Weight Unit Selection List',
        description: 'List of weight units for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of weight unit select options'
    })
    @Secured(Permission.WeightUnitView)
    public async getWeightUnitSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._unitService.getWeightUnitSelectOptions(rEnt);
    }

     @Get('/length/selectOptions')
    @ApiOperation({
        title: 'Length Unit Selection List',
        description: 'List of length units for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of length unit select options'
    })
    @Secured(Permission.LengthUnitView)
    public async getLengthUnitSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._unitService.getLengthUnitSelectOptions(rEnt);
    }

    @Get('/surface/selectOptions')
    @ApiOperation({
        title: 'Surface Unit Selection List',
        description: 'List of surface units for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of surface unit select options'
    })
    @Secured(Permission.SurfaceUnitView)
    public async getSurfaceUnitSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._unitService.getSurfaceUnitSelectOptions(rEnt);
    }

    @Post('weight/list')
    @ApiOperation({
        title: 'Weight Unit List',
        description: 'List Weight Units'
    })
    @ApiOkResponse({
        description: 'Paginated list of Weight Units',
        type: [WeightUnit]
    })
    @Secured(Permission.WeightUnitView)
    public async listGridWeightUnits(
        @Body() dto: WeightUnitParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<WeightUnit>> {
        return await this._unitService.getGridWeightUnits(
            dto.toWeightUnitGridParams(),
            rEnt
        );
    }

    @Post('length/list')
    @ApiOperation({
        title: 'Length Unit List',
        description: 'List Length Units'
    })
    @ApiOkResponse({
        description: 'Paginated list of Length Units',
        type: [LengthUnit]
    })
    @Secured(Permission.LengthUnitView)
    public async listGridLengthUnits(
        @Body() dto: LengthUnitParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<LengthUnit>> {
        return await this._unitService.getGridLengthUnits(
            dto.toLengthUnitGridParams(),
            rEnt
        );
    }

    @Post('surface/list')
    @ApiOperation({
        title: 'Surface Unit List',
        description: 'List Surface Units'
    })
    @ApiOkResponse({
        description: 'Paginated list of Surface Units',
        type: [SurfaceUnit]
    })
    @Secured(Permission.SurfaceUnitView)
    public async listGridSurfaceUnits(
        @Body() dto: SurfaceUnitParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<SurfaceUnit>> {
        return await this._unitService.getGridSurfaceUnits(
            dto.toSurfaceUnitGridParams(),
            rEnt
        );
    }

    @Get('weight/:id')
    @ApiOperation({ title: 'Get Weight Unit by Id' })
    @Secured(Permission.WeightUnitView)
    public async getWeightUnit(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<WeightUnit> {
        return this._unitService.getWeightUnitById(idDto.id, rEnt);
    }

    @Get('length/:id')
    @ApiOperation({ title: 'Get Length Unit by Id' })
    @Secured(Permission.LengthUnitView)
    public async getLengthUnit(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<LengthUnit> {
        return this._unitService.getLengthUnitById(idDto.id, rEnt);
    }

    @Get('surface/:id')
    @ApiOperation({ title: 'Get Surface Unit by Id' })
    @Secured(Permission.SurfaceUnitView)
    public async getSurfaceUnit(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SurfaceUnit> {
        return this._unitService.getSurfaceUnitById(idDto.id, rEnt);
    }

    @Put('weight/:id')
    @ApiOperation({ title: 'Edit Weight Unit' })
    @Secured(Permission.WeightUnitEdit)
    public async editWeightUnit(
        @Param() idDto: IdDto,
        @Body() dto: WeightUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.editWeightUnit(idDto.id, dto, rEnt);
    }

    @Put('length/:id')
    @ApiOperation({ title: 'Edit Length Unit' })
    @Secured(Permission.LengthUnitEdit)
    public async editLengthUnit(
        @Param() idDto: IdDto,
        @Body() dto: LengthUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.editLengthUnit(idDto.id, dto, rEnt);
    }

    @Put('surface/:id')
    @ApiOperation({ title: 'Edit Surface Unit' })
    @Secured(Permission.SurfaceUnitEdit)
    public async editSurfaceUnit(
        @Param() idDto: IdDto,
        @Body() dto: SurfaceUnitDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.editSurfaceUnit(idDto.id, dto, rEnt);
    }

    @Delete('/weight/:id')
    @ApiOperation({ title: 'Delete Weight Unit By Id' })
    @Secured(Permission.WeightUnitDelete)
    public async deleteWeightUnitById(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.deleteWeightUnitById(idDto.id, rEnt);
    }

    @Delete('/length/:id')
    @ApiOperation({ title: 'Delete Length Unit By Id' })
    @Secured(Permission.LengthUnitDelete)
    public async deleteLengthUnitById(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.deleteLengthUnitById(idDto.id, rEnt);
    }

    @Delete('/surface/:id')
    @ApiOperation({ title: 'Delete Surface Unit By Id' })
    @Secured(Permission.SurfaceUnitDelete)
    public async deleteSurfaceUnits(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._unitService.deleteSurfaceUnitById(idDto.id, rEnt);
    }
}
