import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { TagGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';

export class TagFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    public toTagGridFilters(): TagGridFilters {
        return new TagGridFilters(this);
    }
}
