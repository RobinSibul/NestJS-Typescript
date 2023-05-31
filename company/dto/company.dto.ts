import {
    ValidateNested,
    IsString,
    IsIn,
    IsOptional,
    IsInstance,
    IsArray,
    IsBoolean
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { CompanyType } from '@smc/api-common';
import { ObjectId, IsObjectId, transformObjectId } from '@rfx/nst-db/mongo';
import { CompanyProfileDto } from './company-profile.dto';
import { CompanyContactDto } from './company-contact.dto';
import { CompanyOperatingAreaDto } from './company-operating-area.dto';

export class CompanyDto {
    @ValidateNested()
    @Type(() => CompanyProfileDto)
    @IsInstance(CompanyProfileDto)
    @ApiModelProperty()
    public profile: CompanyProfileDto;

    @IsString()
    @IsIn(CompanyType.members)
    @ApiModelProperty({ enum: CompanyType })
    public type: CompanyType;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public defaultWeightUnitId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public defaultSurfaceUnitId: ObjectId;

    @IsOptional()
    @IsArray()
    @Type(() => CompanyContactDto)
    public contacts: CompanyContactDto[];

    @IsOptional()
    @IsArray()
    @Type(() => CompanyOperatingAreaDto)
    public operatingAreas: CompanyOperatingAreaDto[];

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    public supplier: boolean;
}
