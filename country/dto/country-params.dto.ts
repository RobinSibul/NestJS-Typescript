import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CountryGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { CountryFiltersDto } from './country-filters.dto';

export class CountryParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => CountryFiltersDto)
    @IsInstance(CountryFiltersDto)
    @ApiModelProperty()
    public filters: CountryFiltersDto;

    public toCountryGridParams(): CountryGridParams {
        return new CountryGridParams(this, this.filters);
    }
}
