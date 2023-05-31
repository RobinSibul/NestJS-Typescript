import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { IdDto } from '@rfx/nst-db/mongo';
import { Secured } from '@rfx/nst-permissions';
import { EnterpriseIdentity, PlantSequence, RequestEnterprise } from '@smc/api-common';
import { Permission } from '@smc/common';
import { PlantSequenceService } from '../../dal/plant-sequence-dal/plant-sequence.service';
import { PlantSequenceParamsDto } from './dto/plant-sequence-params.dto';
import { PlantSequenceDto } from './dto/plant-sequence.dto';

@Controller('plant-sequence')
export class PlantSequenceController {
    constructor(private readonly _PlantSequenceService: PlantSequenceService) { }

    @Post('list')
    @ApiOperation({
        title: 'Plant Sequence List',
        description: 'List Plant Sequences'
    })
    @ApiOkResponse({
        description: 'Paginated list of Plant Sequences',
        type: [PlantSequence]
    })
    @Secured(Permission.PlantSequenceView)
    public async listGrid(
        @Body() dto: PlantSequenceParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<PlantSequence>> {
        return this._PlantSequenceService.getGridPlantSequence(dto.toPlantSequenceGridParams(), rEnt);
    }

    @Post('')
    @ApiOperation({ title: 'Create Plant Sequence' })
    @ApiCreatedResponse({ description: 'Plant Sequence', type: ObjectId })
    @Secured(Permission.PlantSequenceCreate)
    public async createPlantSequence(
        @Body() dto: PlantSequenceDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._PlantSequenceService.createPlantSequence(dto, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Plant Sequence By Id' })
    @Secured(Permission.PlantSequenceView)
    public async getPlantSequence(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PlantSequence> {
        return this._PlantSequenceService.getPlantSequenceById(idDto.id, rEnt);
    }

    @Get('selectOptions')
    @ApiOperation({
        title: 'Plant Sequence Selection List',
        description: 'List of Plant Sequences for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of Plant Sequence Select Options'
    })
    @Secured(Permission.PlantSequenceView)
    public async getPlantSequenceSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._PlantSequenceService.getPlantSequenceSelectOptions(rEnt);
    }

    @Get('')
    @ApiOperation({ title: 'Get All Plant Sequences' })
    @Secured(Permission.PlantSequenceView)
    public async getAllPlantSequences(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PlantSequence[]> {
        return this._PlantSequenceService.getAllPlantSequences(rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Plant Sequence' })
    @Secured(Permission.PlantSequenceEdit)
    public async editPlantSequence(
        @Param() idDto: IdDto,
        @Body() dto: PlantSequenceDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._PlantSequenceService.editPlantSequence(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Plant Sequence By Id' })
    @Secured(Permission.PlantSequenceDelete)
    public async deletePlantSequence(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._PlantSequenceService.deletePlantSequenceById(idDto.id, rEnt);
    }
}
