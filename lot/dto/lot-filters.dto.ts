import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { LotGridFilters } from '@smc/api-common';
import { StringFilterDto, DateRangeFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class LotFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public numberSearch: StringFilterDto;

    /*
        TODO: IdFilterDto needs to be updated
        to accept null object ids as valid
    */
    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public growerId: IdFilterDto;

    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public speciesId: IdFilterDto;

    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public kindId: IdFilterDto;

    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public varietyId: IdFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => DateRangeFilterDto)
    @IsInstance(DateRangeFilterDto)
    @ApiModelProperty()
    public harvestDate: DateRangeFilterDto;

    public toLotGridFilters(): LotGridFilters {
        return new LotGridFilters(this);
    }
}
