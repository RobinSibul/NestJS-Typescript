import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { VarietyGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { VarietyFiltersDto } from './variety-filters.dto';

export class VarietyParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => VarietyFiltersDto)
    @IsInstance(VarietyFiltersDto)
    @ApiModelProperty()
    public filters: VarietyFiltersDto;

    public toVarietyGridParams(): VarietyGridParams {
        return new VarietyGridParams(this, this.filters);
    }
}
