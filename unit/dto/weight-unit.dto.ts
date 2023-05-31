import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { Transform } from 'class-transformer';

export class WeightUnitDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional() // create only
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public referenceWeightUnitId: ObjectId;

    @IsOptional() // create only
    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public referenceWeightUnits: number;
}
