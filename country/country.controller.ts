import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
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
    Country,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    Area,
    ImportRestriction
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import {
    CountryService,
    SpeciesService,
    TagService
} from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { CountryDto } from './dto/country.dto';
import { CountryParamsDto } from './dto/country-params.dto';
import { AreaDto } from './dto/area.dto';
import { ImportRestrictionDto } from './dto/import-restriction.dto';

@Controller('country')
export class CountryController {
    constructor(
        private readonly _countryService: CountryService,
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Country' })
    @ApiCreatedResponse({ description: 'Country', type: ObjectId })
    @Secured(Permission.CountryCreate)
    public async createCountry(
        @Body() dto: CountryDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._countryService.createCountry(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'Country List',
        description: 'List Country'
    })
    @ApiOkResponse({
        description: 'Paginated list of Country',
        type: [Country]
    })
    @Secured(Permission.CountryView)
    public async listGrid(
        @Body() dto: CountryParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Country>> {
        return this._countryService.getGridCountry(
            dto.toCountryGridParams(),
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Country Selection List',
        description: 'List of country for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of country select options'
    })
    @Secured(Permission.CountryView)
    public async getCountrySelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._countryService.getCountrySelectOptions(rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Country by Id' })
    @Secured(Permission.CountryView)
    public async getCountry(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Country> {
        return this._countryService.getCountryById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Country' })
    @Secured(Permission.CountryEdit)
    public async editCountry(
        @Param() idDto: IdDto,
        @Body() dto: CountryDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._countryService.editCountry(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Country by Id' })
    @Secured(Permission.CountryDelete)
    public async deleteCountry(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._countryService.deleteCountry(idDto.id, rEnt);
    }

    @Post(':id/area')
    @ApiOperation({ title: 'Create Area' })
    @Secured(Permission.CountryEdit)
    public async createArea(
        @Param() idDto: IdDto,
        @Body() dto: AreaDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Area> { // front end needs more than object id
        return this._countryService.createArea(idDto.id, dto, rEnt);
    }

    @Post(':id/importRestriction')
    @ApiOperation({ title: 'Create Import Restriction '})
    @Secured(Permission.CountryEdit)
    public async createImportRestriction(
        @Param() idDto: IdDto,
        @Body() dto: ImportRestrictionDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ImportRestriction> { // front end needs more than object id
        return this._countryService.createImportRestriction(idDto.id, dto, rEnt);
    }

    @Put(':cId/area/:aId')
    @ApiOperation({ title: 'Edit Area' })
    @Secured(Permission.CountryEdit)
    public async editArea(
        @Param('cId') cId: ObjectId,
        @Param('aId') aId: ObjectId,
        @Body() dto: AreaDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Area> { // front end needs more than object id
        let countryId, areaId;
        try {
            countryId = parseObjectId(cId);
            areaId = parseObjectId(aId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._countryService.editArea(countryId, areaId, dto, rEnt);
    }

    @Put(':cId/importRestriction/:rId')
    @ApiOperation({ title: 'Edit Import Restriction' })
    @Secured(Permission.CountryEdit)
    public async editImportRestriction(
        @Param('cId') cId: ObjectId,
        @Param('rId') rId: ObjectId,
        @Body() dto: ImportRestrictionDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ImportRestriction> { // front end needs more than object id
        let countryId, restrId;
        try {
            countryId = parseObjectId(cId);
            restrId = parseObjectId(rId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._countryService.editImportRestriction(countryId, restrId, dto, rEnt);
    }

    @Delete(':cId/area/:aId')
    @ApiOperation({ title: 'Delete Area' })
    @Secured(Permission.CountryEdit)
    public async deleteArea(
        @Param('cId') cId: ObjectId,
        @Param('aId') aId: ObjectId,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let countryId, areaId;
        try {
            countryId = parseObjectId(cId);
            areaId = parseObjectId(aId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._countryService.deleteArea(countryId, areaId, rEnt);
    }

    @Delete(':cId/importRestriction/:rId')
    @ApiOperation({ title: 'Delete Import Restriction' })
    @Secured(Permission.CountryEdit)
    public async deleteImportRestriction(
        @Param('cId') cId: ObjectId,
        @Param('rId') rId: ObjectId,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let countryId, restrId;
        try {
            countryId = parseObjectId(cId);
            restrId = parseObjectId(rId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._countryService.deleteImportRestriction(countryId, restrId, rEnt);
    }
}
