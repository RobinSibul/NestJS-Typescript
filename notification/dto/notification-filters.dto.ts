import { ApiModelProperty } from "@nestjs/swagger";
import { DateRangeFilterDto, StringFilterDto } from "@rfx/nst-common";
import { NotificationGridFilters } from "@smc/api-common";
import { Type } from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";



export class NotificationFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public searchTerm: StringFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => DateRangeFilterDto)
    @IsInstance(DateRangeFilterDto)
    @ApiModelProperty()
    public createdDate: DateRangeFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public readStatus: StringFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public type: StringFilterDto;


    public toNotificationGridFilters(): NotificationGridFilters {
        return new NotificationGridFilters(this);
    }
}