import { ApiModelProperty } from "@nestjs/swagger";
import { GridParamsDto } from "@rfx/nst-common";
import { NotificationGridParams } from "@smc/api-common";
import { Type } from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";
import { NotificationFiltersDto } from "./notification-filters.dto";


export class NotificationParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => NotificationFiltersDto)
    @IsInstance(NotificationFiltersDto)
    @ApiModelProperty()
    public filters: NotificationFiltersDto;

    public toNotificationGridParams(): NotificationGridParams {
        return new NotificationGridParams(this, this.filters);
    }
}