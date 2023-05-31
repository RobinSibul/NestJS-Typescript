import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { LengthUnitGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class LengthUnitFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    public toLengthUnitGridFilters(): LengthUnitGridFilters {
        return new LengthUnitGridFilters(this);
    }
}
