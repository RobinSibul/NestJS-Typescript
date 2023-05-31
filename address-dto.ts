import { IsString, IsOptional, Length, IsUppercase, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { State } from '@smc/api-common';

export class AddressDto {
    @IsString()
    @ApiModelProperty()
    public line1: string;

    @IsString()
    @ApiModelProperty()
    @IsOptional()
    public line2: string;

    @IsString()
    @ApiModelProperty()
    public city: string;

    @IsString()
    // tslint:disable-next-line: no-magic-numbers
    @Length(2, 2)
    @ApiModelProperty()
    @IsUppercase()
    @IsIn(State.members)
    public state: State;

    @IsString()
    @ApiModelProperty()
    public postalCode: string;
}
