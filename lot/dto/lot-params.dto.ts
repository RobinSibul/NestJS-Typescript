import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LotGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { LotFiltersDto } from './lot-filters.dto';

export class LotParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => LotFiltersDto)
    @IsInstance(LotFiltersDto)
    @ApiModelProperty()
    public filters: LotFiltersDto;

    public toLotGridParams(): LotGridParams {
        return new LotGridParams(this, this.filters);
    }
}
