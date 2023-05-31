import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductionAuthorizationGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { ProductionAuthorizationFiltersDto } from './production-authorization-filters.dto';

export class ProductionAuthorizationParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => ProductionAuthorizationFiltersDto)
    @IsInstance(ProductionAuthorizationFiltersDto)
    @ApiModelProperty()
    public filters: ProductionAuthorizationFiltersDto;

    public toProductionAuthorizationGridParams(): ProductionAuthorizationGridParams {
        return new ProductionAuthorizationGridParams(this, this.filters);
    }
}
