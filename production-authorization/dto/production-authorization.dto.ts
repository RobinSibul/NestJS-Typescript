import { IsString, IsOptional, IsNumber, IsDate, IsIn, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { ProductionAuthorizationStatus } from '@smc/common';

export class ProductionAuthorizationDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public customerContractId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public customerLineItemId: ObjectId;

    @IsString()
    @IsIn(ProductionAuthorizationStatus.members)
    @ApiModelProperty()
    public authorizationStatus: ProductionAuthorizationStatus;

    @IsDate()
    @Transform(d => new Date(d))
    @ApiModelProperty()
    public startDate: Date;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
