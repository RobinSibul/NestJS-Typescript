import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WeightUnitGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { WeightUnitFiltersDto } from './weight-unit-filters.dto';

export class WeightUnitParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => WeightUnitFiltersDto)
    @IsInstance(WeightUnitFiltersDto)
    @ApiModelProperty()
    public filters: WeightUnitFiltersDto;

    public toWeightUnitGridParams(): WeightUnitGridParams {
        return new WeightUnitGridParams(this, this.filters);
    }
}
