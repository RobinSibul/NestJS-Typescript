import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SpeciesGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { SpeciesFiltersDto } from './species-filters.dto';

export class SpeciesParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => SpeciesFiltersDto)
    @IsInstance(SpeciesFiltersDto)
    @ApiModelProperty()
    public filters: SpeciesFiltersDto;

    public toSpeciesGridParams(): SpeciesGridParams {
        return new SpeciesGridParams(this, this.filters);
    }
}
