import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { EventFiltersDto } from './event-filters.dto';

export class EventParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => EventFiltersDto)
    @IsInstance(EventFiltersDto)
    @ApiModelProperty()
    public filters: EventFiltersDto;

    public toEventGridParams(): EventGridParams {
        return new EventGridParams(this, this.filters);
    }
}
