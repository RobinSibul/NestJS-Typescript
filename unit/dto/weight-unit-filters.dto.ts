import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { WeightUnitGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class WeightUnitFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    public toWeightUnitGridFilters(): WeightUnitGridFilters {
        return new WeightUnitGridFilters(this);
    }
}
