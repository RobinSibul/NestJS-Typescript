import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GridParamsDto } from '@rfx/nst-common';
import { EventCategoryFiltersDto } from './event-category-filters.dto';
import { EventCategoryGridParams } from '@smc/api-common';

export class EventCategoryParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => EventCategoryFiltersDto)
    @IsInstance(EventCategoryFiltersDto)
    @ApiModelProperty()
    public filters: EventCategoryFiltersDto;

    public toEventCategoryGridParams(): EventCategoryGridParams {
        return new EventCategoryGridParams(this, this.filters);
    }
}
