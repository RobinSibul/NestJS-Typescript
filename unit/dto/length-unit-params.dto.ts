import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LengthUnitGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { LengthUnitFiltersDto } from './length-unit-filters.dto';

export class LengthUnitParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => LengthUnitFiltersDto)
    @IsInstance(LengthUnitFiltersDto)
    @ApiModelProperty()
    public filters: LengthUnitFiltersDto;

    public toLengthUnitGridParams(): LengthUnitGridParams {
        return new LengthUnitGridParams(this, this.filters);
    }
}
