import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { SurfaceUnitGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class SurfaceUnitFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    public toSurfaceUnitGridFilters(): SurfaceUnitGridFilters {
        return new SurfaceUnitGridFilters(this);
    }
}
