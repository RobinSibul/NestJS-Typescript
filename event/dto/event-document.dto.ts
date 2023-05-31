import { ApiModelProperty } from "@nestjs/swagger";
import { IsObjectId, ObjectId, transformObjectId } from "@rfx/nst-db/mongo";
import { Transform } from "class-transformer";
import { IsIn, IsOptional, IsString } from "class-validator";


export class EventDocumentDto {
    @IsObjectId()
    @ApiModelProperty()
    @Transform(transformObjectId)
    public recordedEventId: ObjectId;
    
}