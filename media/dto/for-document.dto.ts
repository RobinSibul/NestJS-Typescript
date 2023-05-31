import { IsString, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { DbCollection } from '@smc/api-common';
import { ObjectId, IsObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { Transform } from 'class-transformer';

export class ForDocumentDto {
    @IsString()
    @IsIn(DbCollection.members)
    @ApiModelProperty()
    public collection: DbCollection;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public documentId: ObjectId;
}
