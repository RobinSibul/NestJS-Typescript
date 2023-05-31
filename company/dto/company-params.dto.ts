import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CompanyGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { CompanyFiltersDto } from './company-filters.dto';

export class CompanyParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => CompanyFiltersDto)
    @IsInstance(CompanyFiltersDto)
    @ApiModelProperty()
    public filters: CompanyFiltersDto;

    public toCompanyGridParams(): CompanyGridParams {
        return new CompanyGridParams(this, this.filters);
    }
}
