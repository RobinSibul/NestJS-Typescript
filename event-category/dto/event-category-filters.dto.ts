import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type} from 'class-transformer';
import { EventCategoryGridFilters } from '@smc/api-common';
import { StringFilterDto} from '@rfx/nst-common';

export class EventCategoryFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public nameSearch: StringFilterDto;

    public toEventCategoryGridFilters(): EventCategoryGridFilters {
        return new EventCategoryGridFilters(this);
    }
}
