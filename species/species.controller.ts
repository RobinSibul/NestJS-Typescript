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
    Species,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    SpeciesClass
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { SpeciesService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { SpeciesDto } from './dto/species.dto';
import { SpeciesParamsDto } from './dto/species-params.dto';
import { SpeciesClassDto } from './dto/species-class.dto';

@Controller('species')
export class SpeciesController {
    constructor(
        private readonly _speciesService: SpeciesService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Species' })
    @ApiCreatedResponse({ description: 'Species', type: ObjectId })
    @Secured(Permission.SpeciesCreate)
    public async createSpecies(
        @Body() dto: SpeciesDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._speciesService.createSpecies(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'Species List',
        description: 'List Species'
    })
    @ApiOkResponse({
        description: 'Paginated list of Species',
        type: [Species]
    })
    @Secured(Permission.SpeciesView)
    public async listGrid(
        @Body() dto: SpeciesParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Species>> {
        return await this._speciesService.getGridSpecies(
            dto.toSpeciesGridParams(),
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Species Selection List',
        description: 'List of species for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of species select options'
    })
    @Secured(Permission.SpeciesView)
    public async getSpeciesSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._speciesService.getSpeciesSelectOptions(
            rEnt
        );
    }

    @Get('/class/selectOptions')
    @ApiOperation({
        title: 'Species Class Selection List',
        description: 'List of species classes for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of species class select options'
    })
    @Secured(Permission.SpeciesView)
    public async getSpeciesClassSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity,
        @Query('speciesId') sId: string = null
    ): Promise<SelectOption<ObjectId>[]> {
        let speciesId = null;
        if (sId) {
            try {
                speciesId = parseObjectId(sId);
            } catch (e) {
                throw new BadRequestException('Invalid Id');
            }
        }
        return this._speciesService.getSpeciesClassSelectOptions(
            rEnt,
            speciesId
        );
    }

    @Get('/class/:id')
    @ApiOperation({ title: 'Get Species Class by Id' })
    @Secured(Permission.SpeciesView)
    public async getSpeciesClass(
        @RequestEnterprise() rEnt: EnterpriseIdentity,
        @Param() idDto: IdDto
    ): Promise<SpeciesClass> {
        return this._speciesService.getSpeciesClassById(
            idDto.id,
            rEnt
        );
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Species by Id' })
    @Secured(Permission.SpeciesView)
    public async getSpecies(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Species> {
        return this._speciesService.getSpeciesById(
            idDto.id,
            rEnt
        );
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Species' })
    @Secured(Permission.SpeciesEdit)
    public async editSpecies(
        @Param() idDto: IdDto,
        @Body() dto: SpeciesDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._speciesService.editSpecies(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Species' })
    @Secured(Permission.SpeciesDelete)
    public async deleteSpecies(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._speciesService.deleteSpecies(idDto.id, rEnt);
    }

    @Post(':id/class')
    @ApiOperation({ title: 'Create Species Class' })
    @Secured(Permission.SpeciesEdit)
    public async createSpeciesClass(
        @Param() idDto: IdDto,
        @Body() dto: SpeciesClassDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SpeciesClass> { // front end needs more than object id
        return this._speciesService.createSpeciesClass(idDto.id, dto, rEnt);
    }

    @Put(':sId/class/:cId')
    @ApiOperation({ title: 'Edit Species Class' })
    @Secured(Permission.SpeciesEdit)
    public async editSpeciesClass(
        @Param('sId') sId: string,
        @Param('cId') cId: string,
        @Body() dto: SpeciesClassDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SpeciesClass> { // front end needs more than object id
        let speciesId, classId;
        try {
            speciesId = parseObjectId(sId);
            classId = parseObjectId(cId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._speciesService.editSpeciesClass(speciesId, classId, dto, rEnt);
    }

    @Delete(':sId/class/:cId')
    @ApiOperation({ title: 'Delete Species Class' })
    @Secured(Permission.SpeciesEdit)
    public async deleteSpeciesClass(
        @Param('sId') sId: string,
        @Param('cId') cId: string,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let speciesId, classId;
        try {
            speciesId = parseObjectId(sId);
            classId = parseObjectId(cId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._speciesService.deleteSpeciesClass(speciesId, classId, rEnt);
    }
}
