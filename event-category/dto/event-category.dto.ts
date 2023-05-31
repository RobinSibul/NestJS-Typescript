import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId, ObjectId } from '@rfx/nst-db/mongo';

export class EventCategoryDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsObjectId()
    @IsOptional()
    @ApiModelProperty()
    public parentCategory: ObjectId;
}
