import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { PlantSequenceGridFilters } from '@smc/api-common';
import { StringFilterDto, DateRangeFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class PlantSequenceFiltersDto {
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
    public PlantSequenceType: StringFilterDto;

    public toPlantSequenceGridFilters(): PlantSequenceGridFilters {
        return new PlantSequenceGridFilters(this);
    }
}
