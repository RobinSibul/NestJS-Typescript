import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Query,
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
    CustomerContract,
    CustomerLineItem,
    CustomerContractStatus,
    User,
    RequestEnterprise,
    EnterpriseIdentity
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { CustomerContractService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { CustomerContractDto } from './dto/customer-contract.dto';
import { CustomerContractParamsDto } from './dto/customer-contract-params.dto';
import { CustomerLineItemDto } from './dto/customer-line-item.dto';

@Controller('customerContract')
export class CustomerContractController {
    constructor(
        private readonly _customerContractService: CustomerContractService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create CustomerContract' })
    @ApiCreatedResponse({ description: 'CustomerContract', type: ObjectId })
    @Secured(Permission.CustomerContractCreate)
    public async createCustomerContract(
        @Body() dto: CustomerContractDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._customerContractService.createCustomerContract(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'CustomerContract List',
        description: 'List CustomerContract'
    })
    @ApiOkResponse({
        description: 'Paginated list of CustomerContract',
        type: [CustomerContract]
    })
    @Secured(Permission.CustomerContractView)
    public async listGrid(
        @Body() dto: CustomerContractParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<CustomerContract>> {
        return await this._customerContractService.getGridCustomerContract(
            dto.toCustomerContractGridParams(),
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'CustomerContract Selection List',
        description: 'List of customer contract for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of customer contract select options'
    })
    @Secured(Permission.CustomerContractView)
    public async getCustomerContractSelectOptions(
        @Query('contractStatus') contractStatus: CustomerContractStatus = null,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._customerContractService
            .getCustomerContractSelectOptions(contractStatus, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Customer Contract by Id' })
    @Secured(Permission.CustomerContractView)
    public async getCustomerContract(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<CustomerContract> {
        return this._customerContractService.getCustomerContractById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Customer Contract' })
    @Secured(Permission.CustomerContractEdit)
    public async editCustomerContract(
        @Param() idDto: IdDto,
        @Body() dto: CustomerContractDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._customerContractService.editCustomerContract(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Customer Contract By Id' })
    @Secured(Permission.CustomerContractDelete)
    public async deleteCustomerContract(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._customerContractService.deleteCustomerContractById(idDto.id, rEnt);
    }

    @Post(':id/lineItem')
    @ApiOperation({ title: 'Create Customer Line Item' })
    @Secured(Permission.CustomerContractEdit)
    public async createCustomerLineItem(
        @Param() idDto: IdDto,
        @Body() dto: CustomerLineItemDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<CustomerLineItem> {
        return this._customerContractService.createCustomerLineItem(idDto.id, dto, rEnt);
    }

    @Get(':ccId/lineItem/availableSelectOptions/:paId')
    @ApiOperation({
        title: 'Select options for available line items',
        description: 'List of customer line items for customer\
            contract not associated with a production authorization'
    })
    @ApiOkResponse({
        description: 'List of line item select options'
    })
    @Secured(Permission.CustomerContractEdit)
    public async getAvailableLineItemSelectOptions(
        @Param('ccId') ccId: string,
        @Param('paId') paId: string = 'null',
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        let contractId = null;
        let authorizationId = null;
        try {
            contractId = parseObjectId(ccId);
            if (paId !== 'null') {
                authorizationId = parseObjectId(paId);
            }
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._customerContractService.getAvailableLineItemSelectOptions(
            contractId,
            authorizationId,
            rEnt
        );
    }

    @Put(':ccId/lineItem/:liId')
    @ApiOperation({ title: 'Edit Customer Line Item' })
    @Secured(Permission.CustomerContractEdit)
    public editCustomerLineItem(
        @Param('ccId') ccId: string,
        @Param('liId') liId: string,
        @Body() dto: CustomerLineItemDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<CustomerLineItem> {
        let contractId, lineItemId;
        try {
            contractId = parseObjectId(ccId);
            lineItemId = parseObjectId(liId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._customerContractService.editCustomerLineItem(
            contractId,
            lineItemId,
            dto,
            rEnt
        );
    }

    @Delete(':ccId/lineItem/:liId')
    @ApiOperation({ title: 'Delete Customer Line Item' })
    @Secured(Permission.CustomerContractEdit)
    public deleteCustomerLineItem(
        @Param('ccId') ccId: string,
        @Param('liId') liId: string,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let contractId, lineItemId;
        try {
            contractId = parseObjectId(ccId);
            lineItemId = parseObjectId(liId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._customerContractService.deleteCustomerLineItem(
            contractId,
            lineItemId,
            rEnt
        );
    }

    @Post('count')
    @ApiOperation({
        title: 'Customer Count',
        description: 'Count Customer'
    })
    @ApiOkResponse({
        description: 'Count of Customer',
        type: [CustomerContract]
    })
    @Secured(Permission.VarietyView)
    public async countVariety(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Object> {
        return await this._customerContractService.getCustomerCount(
            rEnt
        );
    }

}
