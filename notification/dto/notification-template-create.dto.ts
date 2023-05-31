import { ApiModelProperty } from "@nestjs/swagger";
import { IsObjectId, ObjectId, transformObjectId } from "@rfx/nst-db/mongo";
import { NotificationType, Priority, TemplateStatus } from "@smc/common";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsInstance, IsOptional, IsString, ValidateNested } from "class-validator";


export class NotificationTemplateCreateDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    public subject: string;

    @ApiModelProperty()
    @IsString()
    public message: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @IsIn(Priority.members)
    public priority: Priority;

    @IsOptional()
    @Transform(d => !!d ? new Date(d) : null)
    @IsDate()
    @ApiModelProperty()
    public sendDate: Date;

    @IsObjectId()
    @Transform(transformObjectId)
    public lot: ObjectId;

   
    @IsObjectId()
    @Transform(transformObjectId)
    public eventTemplate: ObjectId;


}