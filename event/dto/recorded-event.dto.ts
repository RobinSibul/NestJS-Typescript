import { ApiModelProperty } from "@nestjs/swagger";
import { IsObjectId, ObjectId } from "@rfx/nst-db/mongo";
import { EventIdentity, LotIdentity  } from "@smc/api-common";
import { Transform } from "class-transformer";
import {  IsOptional, IsString } from "class-validator";



export class RecordedEventDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;

    @IsObjectId()
    @Transform(ObjectId.createFromHexString)
    @ApiModelProperty()
    public lot: ObjectId;


    @IsObjectId()
     @Transform(ObjectId.createFromHexString)
    @ApiModelProperty()
    public eventTemplate: ObjectId;

    @IsOptional()
    @ApiModelProperty()
    public requiredDataItems: Object;

    @IsOptional()
    @ApiModelProperty()
    public customFields: Object;

    @IsOptional()
    @ApiModelProperty()
    public recordedDate: Date;
}