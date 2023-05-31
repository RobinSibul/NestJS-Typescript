import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId, ObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { EnterpriseIdentity } from '@smc/api-common';
import { PlantSequenceType } from '@smc/common';
import { Transform } from 'class-transformer';
import {  IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { transform } from 'lodash';

export class PlantSequenceDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsString()
    @IsIn(PlantSequenceType.members)
    @ApiModelProperty({ enum: PlantSequenceType })
    public type: PlantSequenceType;

    @IsOptional()
    @ApiModelProperty()
    public rows: number;
    
    @IsOptional()
    @ApiModelProperty()
    public bedWidth: number;
    
    @IsOptional()
    @ApiModelProperty()
    public distance: number;

    @IsOptional()
    @IsObjectId()
    @ApiModelProperty()
    public preferedLengthUnit: ObjectId;

}