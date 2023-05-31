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
    ProductionAuthorization,
    ProductionAuthorizationArea,
    ListProductionAuthorization,
    ProductionAuthorizationStatus,
    User,
    RequestEnterprise,
    EnterpriseIdentity
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { ProductionAuthorizationService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { ProductionAuthorizationDto } from './dto/production-authorization.dto';
import { ProductionAuthorizationAreaDto } from './dto/production-authorization-area.dto';
import { ProductionAuthorizationParamsDto } from './dto/production-authorization-params.dto';

@Controller('productionAuthorization')
export class ProductionAuthorizationController {
    constructor(
        private readonly _productionAuthorizationService: ProductionAuthorizationService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create ProductionAuthorization' })
    @ApiCreatedResponse({ description: 'ProductionAuthorization', type: ObjectId })
    @Secured(Permission.ProductionAuthorizationCreate)
    public async createProductionAuthorization(
        @Body() dto: ProductionAuthorizationDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._productionAuthorizationService
            .createProductionAuthorization(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'ProductionAuthorization List',
        description: 'List ProductionAuthorization'
    })
    @ApiOkResponse({
        description: 'Paginated list of ProductionAuthorization',
        type: [ProductionAuthorization]
    })
    @Secured(Permission.ProductionAuthorizationView)
    public async listGrid(
        @Body() dto: ProductionAuthorizationParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<ListProductionAuthorization>> {
        return await this._productionAuthorizationService
            .getGridProductionAuthorization(
                dto.toProductionAuthorizationGridParams(),
                rEnt
            );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'ProductionAuthorization Selection List',
        description: 'List of production authorization for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of production authorization select options'
    })
    @Secured(Permission.ProductionAuthorizationView)
    public async getProductionAuthorizationSelectOptions(
        @Query('authStatus') authStatus: ProductionAuthorizationStatus = null,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._productionAuthorizationService
            .getProductionAuthorizationSelectOptions(authStatus, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Production Authorization by Id' })
    @Secured(Permission.ProductionAuthorizationView)
    public async getProductionAuthorization(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ProductionAuthorization> {
        return this._productionAuthorizationService
            .getProductionAuthorizationById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Production Authorization' })
    @Secured(Permission.ProductionAuthorizationEdit)
    public async editProductionAuthorization(
        @Param() idDto: IdDto,
        @Body() dto: ProductionAuthorizationDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._productionAuthorizationService
            .editProductionAuthorization(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Production Authorization By Id' })
    @Secured(Permission.ProductionAuthorizationDelete)
    public async deleteProductionAuthorization(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._productionAuthorizationService
            .deleteProductionAuthorizationById(idDto.id, rEnt);
    }

    @Post(':id/authArea')
    @ApiOperation({ title: 'Create Production Authorization Area' })
    @Secured(Permission.ProductionAuthorizationEdit)
    public async createProductionAuthorizationArea(
        @Param() idDto: IdDto,
        @Body() dto: ProductionAuthorizationAreaDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ProductionAuthorizationArea> {
        return this._productionAuthorizationService
            .createProductionAuthorizationArea(idDto.id, dto, rEnt);
    }

    @Put(':authId/authArea/:areaId')
    @ApiOperation({ title: 'Edit Production Authorization Area' })
    @Secured(Permission.ProductionAuthorizationEdit)
    public async editProductionAuthorizationArea(
        @Param('authId') authId: string,
        @Param('areaId') areaId: string,
        @Body() dto: ProductionAuthorizationAreaDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ProductionAuthorizationArea> {
        let prodAuthId, prodAreaId;
        try {
            prodAuthId = parseObjectId(authId);
            prodAreaId = parseObjectId(areaId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._productionAuthorizationService
            .editProductionAuthorizationArea(
                prodAuthId,
                prodAreaId,
                dto,
                rEnt
            );
    }

    @Delete(':authId/authArea/:areaId')
    @ApiOperation({ title: 'Delete Production Authorization Area' })
    @Secured(Permission.ProductionAuthorizationEdit)
    public async deleteProductionAuthorizationArea(
        @Param('authId') authId: string,
        @Param('areaId') areaId: string,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let prodAuthId, prodAreaId;
        try {
            prodAuthId = parseObjectId(authId);
            prodAreaId = parseObjectId(areaId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._productionAuthorizationService
            .deleteProductionAuthorizationArea(
                prodAuthId,
                prodAreaId,
                rEnt
            );
    }

    @Post('count')
    @ApiOperation({
        title: 'ProductionAuthorization Count',
        description: 'Count ProductionAuthorization'
    })
    @ApiOkResponse({
        description: 'Count of ProductionAuthorization',
        type: [ProductionAuthorization]
    })
    @Secured(Permission.VarietyView)
    public async countVariety(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Object> {
        return await this._productionAuthorizationService.getProductionCount(
            rEnt
        );
    }
}
