import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { SlidingScaleGridFilters, CompanyType } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class SlidingScaleFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public nameSearch: StringFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public clauseSearch: StringFilterDto;

    public toSlidingScaleGridFilters(): SlidingScaleGridFilters {
        return new SlidingScaleGridFilters(this);
    }
}
