import {
    IsString,
    IsNumber,
    IsIn,
    IsDate,
    IsOptional,
    ValidateNested,
    IsInstance,
    Min, IsArray
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { LotStatus, LotProductionRating, LotAttributeValue } from '@smc/api-common';
import { ApiModelProperty } from '@nestjs/swagger';
import { MeasuredQuantityDto } from '../../measured-quantity.dto';

export class LotDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public fieldId: ObjectId;

    @ValidateNested()
    @Type(() => MeasuredQuantityDto)
    @IsInstance(MeasuredQuantityDto)
    @ApiModelProperty()
    public surfaceQuantity: MeasuredQuantityDto;

    @IsNumber()
    @Min(0)
    @ApiModelProperty()
    public estimatedKilograms: number;

    @IsString()
    @IsIn(LotStatus.members)
    @ApiModelProperty()
    public lotStatus: LotStatus;

    @IsString()
    @IsIn(LotProductionRating.members)
    @ApiModelProperty()
    public productionRating: LotProductionRating;

    @IsDate()
    @Transform(d => new Date(d))
    @ApiModelProperty()
    public harvestDate: Date;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;

    @IsOptional()
    @IsArray()
    @ApiModelProperty()
    public lotAttributeValue: LotAttributeValue[];
}
