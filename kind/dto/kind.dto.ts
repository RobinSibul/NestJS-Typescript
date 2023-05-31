import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';

export class KindDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public speciesId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public speciesClassId: ObjectId;
}
