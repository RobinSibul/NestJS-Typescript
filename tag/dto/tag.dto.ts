import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';

export class TagDto {
    @IsOptional()
    @IsObjectId()
    @Transform(transformObjectId)
    public _id: ObjectId;

    @IsString()
    @ApiModelProperty()
    public name: string;
}
