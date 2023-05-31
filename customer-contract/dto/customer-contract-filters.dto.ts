import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CustomerContractGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class CustomerContractFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public contractStatus: StringFilterDto;

    /*
        TODO: IdFilterDto needs to be updated
        to accept null object ids as valid
    */
    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public customerId: IdFilterDto;

    public toCustomerContractGridFilters(): CustomerContractGridFilters {
        return new CustomerContractGridFilters(this);
    }
}
