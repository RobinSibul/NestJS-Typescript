import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PlantSequenceGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { PlantSequenceFiltersDto } from './plant-sequence-filters.dto';

export class PlantSequenceParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => PlantSequenceFiltersDto)
    @IsInstance(PlantSequenceFiltersDto)
    @ApiModelProperty()
    public filters: PlantSequenceFiltersDto;

    public toPlantSequenceGridParams(): PlantSequenceGridParams {
        return new PlantSequenceGridParams(this, this.filters);
    }
}
