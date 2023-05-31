import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { PollinationType, HybridClass } from '@smc/api-common';

export class VarietyDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public productionCode: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public kindId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public speciesId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public speciesClassId: ObjectId;

    @IsString()
    @IsIn(PollinationType.members)
    @ApiModelProperty()
    public pollinationType: PollinationType;

    @IsOptional()
    @IsString()
    @IsIn(HybridClass.members)
    @ApiModelProperty()
    public hybridClass: HybridClass;
}
