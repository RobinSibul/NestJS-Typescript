import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TagGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { TagFiltersDto } from './tag-filters.dto';

export class TagParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => TagFiltersDto)
    @IsInstance(TagFiltersDto)
    @ApiModelProperty()
    public filters: TagFiltersDto;

    public toTagGridParams(): TagGridParams {
        return new TagGridParams(this, this.filters);
    }
}
