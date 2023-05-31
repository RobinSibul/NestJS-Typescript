import { IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsObjectId, transformObjectId, ObjectId } from '@rfx/nst-db/mongo';
import { DbCollection } from '@smc/api-common';
import { ApiModelProperty } from '@nestjs/swagger';

export class TagPullDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public docId: ObjectId;

    @IsString()
    @IsIn(DbCollection.members)
    @ApiModelProperty()
    public docCollection: DbCollection;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public tagId: ObjectId;
}
