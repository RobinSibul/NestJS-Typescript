import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SlidingScaleGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { SlidingScaleFiltersDto } from './slidingScale-filters.dto';

export class SlidingScaleParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => SlidingScaleFiltersDto)
    @IsInstance(SlidingScaleFiltersDto)
    @ApiModelProperty()
    public filters: SlidingScaleFiltersDto;

    public toSlidingScaleGridParams(): SlidingScaleGridParams {
        return new SlidingScaleGridParams(this, this.filters);
    }
}
