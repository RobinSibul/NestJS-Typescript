import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { LotEventGridFilters } from '@smc/api-common';
import { StringFilterDto, DateRangeFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class LotEventFiltersDto {
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public lotIdFilter: IdFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public numberSearch: StringFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public lotEventType: StringFilterDto;

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

    @ValidateNested()
    @IsOptional()
    @Type(() => DateRangeFilterDto)
    @IsInstance(DateRangeFilterDto)
    @ApiModelProperty()
    public eventDate: DateRangeFilterDto;
    
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()    
    public eventCategoryId: StringFilterDto;

    public toLotEventGridFilters(): LotEventGridFilters {
        return new LotEventGridFilters(this);
    }
}
