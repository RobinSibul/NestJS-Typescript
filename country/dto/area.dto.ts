import { IsString, IsIn, IsBoolean, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { DeliverySeason } from '@smc/api-common';

export class AreaDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;

    @IsString()
    @IsIn(DeliverySeason.members)
    @ApiModelProperty()
    public deliverySeason: DeliverySeason;

    @IsBoolean()
    @ApiModelProperty()
    public sales: boolean;

    @IsBoolean()
    @ApiModelProperty()
    public production: boolean;
}
