import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { Transform } from 'class-transformer';

export class SpeciesClassDto {
    @IsOptional()
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public parentSpeciesClassId: ObjectId;

    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;
}
