import { IsString, IsOptional, IsIn, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { GrowerContractStatus } from '@smc/api-common';

export class GrowerContractDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public productionAuthorizationId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public productionAuthorizationAreaId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public growerId: ObjectId;

    @IsString()
    @IsIn(GrowerContractStatus.members)
    @ApiModelProperty()
    public contractStatus: GrowerContractStatus;

    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public productionRateKilogramsPerHectare: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
