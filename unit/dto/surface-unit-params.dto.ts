import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SurfaceUnitGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { SurfaceUnitFiltersDto } from './surface-unit-filters.dto';

export class SurfaceUnitParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => SurfaceUnitFiltersDto)
    @IsInstance(SurfaceUnitFiltersDto)
    @ApiModelProperty()
    public filters: SurfaceUnitFiltersDto;

    public toSurfaceUnitGridParams(): SurfaceUnitGridParams {
        return new SurfaceUnitGridParams(this, this.filters);
    }
}
