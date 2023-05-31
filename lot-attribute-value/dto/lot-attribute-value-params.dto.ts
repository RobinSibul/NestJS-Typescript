import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LotAttributeGridParams, LotGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { LotAttributeFiltersDto } from './lot-attribute-value-filters.dto';

export class LotAttributeParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => LotAttributeFiltersDto)
    @IsInstance(LotAttributeFiltersDto)
    @ApiModelProperty()
    public filters: LotAttributeFiltersDto;

    public toLotAttributeGridParams(): LotAttributeGridParams {
        return new LotAttributeGridParams(this, this.filters);
    }
}
