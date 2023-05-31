import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CompanyContactDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public firstName: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public lastName: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public phone: string;

    @IsOptional()
    @IsEmail()
    @Transform((email: string) => !!email ? email.toLowerCase() : email)
    @ApiModelProperty()
    public email: string;

    @IsBoolean()
    @ApiModelProperty()
    public primary: boolean;
}
