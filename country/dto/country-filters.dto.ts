import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CountryGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class CountryFiltersDto {
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
    public numberSearch: StringFilterDto;

    public toCountryGridFilters(): CountryGridFilters {
        return new CountryGridFilters(this);
    }
}
