import { IsString, IsOptional, IsNumber, IsDate, IsIn, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { CustomerContractStatus } from '@smc/common';

export class CustomerContractDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public customerId: ObjectId;

    @IsString()
    @IsIn(CustomerContractStatus.members)
    @ApiModelProperty()
    public contractStatus: CustomerContractStatus;
}
