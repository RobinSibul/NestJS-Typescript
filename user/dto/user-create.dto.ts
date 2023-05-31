import { IsString, IsArray, IsIn, ValidateNested, IsDefined, IsEmail, IsOptional, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, IsObjectId, transformObjectIdList, transformObjectId } from '@rfx/nst-db/mongo';


export class UserCreateDto {
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

    @IsObjectId()
    @IsOptional()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public companyId: ObjectId;
}
