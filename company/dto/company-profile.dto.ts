import { IsString, IsEmail, IsOptional, ValidateNested, IsInstance } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { AddressDto } from '../../address-dto';

export class CompanyProfileDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsEmail()
    @Transform((email: string) => email.toLowerCase())
    @ApiModelProperty()
    public email: string;

    @IsString()
    @ApiModelProperty()
    public phone: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public fax?: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public taxId?: string;

    @ValidateNested()
    @Type(() => AddressDto)
    @IsInstance(AddressDto)
    @ApiModelProperty()
    public address: AddressDto;
}
