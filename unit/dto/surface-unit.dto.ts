import { IsString, IsNumber, IsPositive, IsBoolean, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, IsObjectId, transformObjectId } from '@rfx/nst-db/mongo';

export class SurfaceUnitDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsBoolean()
    @ApiModelProperty()
    public divisible: boolean;

    @IsOptional() // create only
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public referenceSurfaceUnitId: ObjectId;

    @IsOptional() // create only
    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public referenceSurfaceUnits: number;
}
