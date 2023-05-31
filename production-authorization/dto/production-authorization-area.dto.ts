import { IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';

export class ProductionAuthorizationAreaDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public productionCountryId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public productionAreaId: ObjectId;

    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public unitsToProduce: number;
}
