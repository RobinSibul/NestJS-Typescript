import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FieldGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { FieldFiltersDto } from './field-filters.dto';

export class FieldParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => FieldFiltersDto)
    @IsInstance(FieldFiltersDto)
    @ApiModelProperty()
    public filters: FieldFiltersDto;

    public toFieldGridParams(): FieldGridParams {
        return new FieldGridParams(this, this.filters);
    }
}
