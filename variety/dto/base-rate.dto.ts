import { IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';

export class BaseRateDto {
    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public kilogramsPerHectare: number;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public areaId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public countryId: ObjectId;
}
