import { IsString, IsNumber, IsIn, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { MeasurementType } from '@smc/api-common';

export class MeasuredQuantityDto {
    @IsString()
    @IsIn(MeasurementType.members)
    @ApiModelProperty()
    public type: MeasurementType;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public unitId: ObjectId;

    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public units: number;
}
