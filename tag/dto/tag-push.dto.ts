import { IsOptional, IsIn, IsString, ValidateNested, IsInstance } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsObjectId, transformObjectId, ObjectId } from '@rfx/nst-db/mongo';
import { DbCollection } from '@smc/api-common';
import { ApiModelProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';

export class TagPushDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public docId: ObjectId;

    @IsString()
    @IsIn(DbCollection.members)
    @ApiModelProperty()
    public docCollection: DbCollection;

    @ValidateNested()
    @Type(() => TagDto)
    @IsInstance(TagDto)
    @ApiModelProperty()
    public tag: TagDto;
}
