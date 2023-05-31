import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { Transform } from 'class-transformer';

export class LengthUnitDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional() // create only
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public referenceLengthUnitId: ObjectId;

    @IsOptional() // create only
    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public referenceLengthUnits: number;
}
