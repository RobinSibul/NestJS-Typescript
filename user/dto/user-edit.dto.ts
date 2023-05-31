import { IsString, IsArray, IsIn, ValidateNested, IsDefined, IsEmail, IsOptional, ArrayMinSize, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectIdList } from '@rfx/nst-db/mongo';

export class UserEditDto {
    @IsEmail()
    @Transform((email: string) => email.toLowerCase())
    @ApiModelProperty()
    public email: string;

    @IsString()
    @ApiModelProperty()
    public firstName: string;

    @IsString()
    @ApiModelProperty()
    public lastName: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    public phone: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    public timezone: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsObjectId({ each: true })
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public roles: ObjectId[];

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    public employeeNumber: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    public employeeRole: string;

    @IsBoolean()
    @IsOptional()
    @ApiModelProperty()
    public acceptedTerms: boolean;
}
