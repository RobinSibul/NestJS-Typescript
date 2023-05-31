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
    CompanyProfile,
    Company,
    CompanyType,
    CompanyOperatingArea,
    User,
    RequestEnterprise,
    EnterpriseIdentity
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { UserService, MediaService, CompanyService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { CompanyDto } from './dto/company.dto';
import { CompanyParamsDto } from './dto/company-params.dto';
import { CompanyOperatingAreaDto } from './dto/company-operating-area.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly _companyService: CompanyService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Company' })
    @ApiCreatedResponse({ description: 'Company', type: ObjectId })
    @Secured(Permission.CompanyCreate)
    public async createCompany(
        @Body() dto: CompanyDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._companyService.createCompany(
            dto,
            rEnterprise
        );
    }

    @Post('list')
    @ApiOperation({
        title: 'Company List',
        description: 'List Compnies'
    })
    @ApiOkResponse({
        description: 'Paginated list of Companies',
        type: [Company]
    })
    @Secured(Permission.CompanyView)
    public async listGrid(
        @Body() dto: CompanyParamsDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<PaginatedListModel<Company>> {
        return await this._companyService.getGridCompanies(
            dto.toCompanyGridParams(),
            rEnterprise
        );
    }

    @Get('selectOptions')
    @ApiOperation({
        title: 'Company Selection List',
        description: 'List of companies for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of companies select options'
    })
    @Secured(Permission.CompanyView)
    public async getCompanySelectOptions(
        @Query('type') type: CompanyType = null,
        @Query('aId') aId: string = null,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        let areaId = null;
        if (!!aId) {
            try {
                areaId = parseObjectId(aId);
            } catch (e) {
                throw new BadRequestException('Invalid Id');
            }
        }
        return this._companyService.getCompanySelectOptions(type, areaId, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Company by Id' })
    @Secured(Permission.CompanyView)
    public async getCompany(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<Company> {
        return this._companyService.getCompanyById(
            idDto.id,
            rEnterprise
        );
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Company' })
    @Secured(Permission.CompanyEdit)
    public async editCompany(
        @Param() idDto: IdDto,
        @Body() dto: CompanyDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<void> {
        return this._companyService.editCompany(
            idDto.id,
            dto,
            rEnterprise
        );
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Company by Id' })
    @Secured(Permission.CompanyDelete)
    public async deleteCompany(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._companyService.deleteCompany(idDto.id, rEnt);
    }
}
