import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { LotAttributeGridFilters } from '@smc/api-common';
import { StringFilterDto, DateRangeFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class LotAttributeFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public nameSearch: StringFilterDto;

     @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public lotAttributeType: StringFilterDto;

    public toLotAttributeGridFilters(): LotAttributeGridFilters {
        return new LotAttributeGridFilters(this);
    }
}
