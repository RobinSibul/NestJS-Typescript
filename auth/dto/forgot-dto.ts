import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class ForgotDto {
    @IsEmail()
    @Transform((email: string) => email.toLowerCase())
    @ApiModelProperty()
    public email: string;
}
