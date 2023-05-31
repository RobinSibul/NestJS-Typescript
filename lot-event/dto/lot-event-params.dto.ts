import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LotEventGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { LotEventFiltersDto } from './lot-event-filters.dto';

export class LotEventParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => LotEventFiltersDto)
    @IsInstance(LotEventFiltersDto)
    @ApiModelProperty()
    public filters: LotEventFiltersDto;

    public toLotEventGridParams(): LotEventGridParams {
        return new LotEventGridParams(this, this.filters);
    }
}
