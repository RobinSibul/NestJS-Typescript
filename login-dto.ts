import { IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
    @IsEmail()
    @Transform((email: string) => email.toLowerCase())
    @ApiModelProperty()
    public email: string;
    @IsString()
    @ApiModelProperty()
    public password: string;
}
