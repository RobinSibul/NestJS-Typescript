import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId, ObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { EnterpriseIdentity } from '@smc/api-common';
import { LotAttributeType } from '@smc/common';
import { Transform } from 'class-transformer';
import {  IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { transform } from 'lodash';

export class LotAttributeDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsString()
    @IsIn(LotAttributeType.members)
    @ApiModelProperty({ enum: LotAttributeType })
    public type: LotAttributeType;

    @IsOptional()
    @IsArray()
    @ApiModelProperty()
    public options: string[];

    @IsOptional()
    @IsObjectId()
    @ApiModelProperty()
    public preferedLengthUnit: ObjectId;

    @IsOptional()
    @IsObjectId()
    @ApiModelProperty()
    public preferedWeightUnit: ObjectId;

    @IsOptional()
    @IsObjectId()
    @ApiModelProperty()
    public preferedSurfaceUnit: ObjectId;
}