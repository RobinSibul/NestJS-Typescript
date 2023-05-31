import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CustomerContractGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { CustomerContractFiltersDto } from './customer-contract-filters.dto';

export class CustomerContractParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => CustomerContractFiltersDto)
    @IsInstance(CustomerContractFiltersDto)
    @ApiModelProperty()
    public filters: CustomerContractFiltersDto;

    public toCustomerContractGridParams(): CustomerContractGridParams {
        return new CustomerContractGridParams(this, this.filters);
    }
}
