import { IsString, IsArray, IsOptional, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectId, transformObjectId, transformObjectIdList, IsObjectId } from '@rfx/nst-db/mongo';
import { Transform } from 'class-transformer';
import { ImportRestrictionReason } from '@smc/api-common';

export class ImportRestrictionDto {
    @IsOptional()
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public speciesId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public exportCountryId: ObjectId;

    @IsOptional()
    @IsArray()
    @IsObjectId({ each: true })
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public exportCountryAreaIds: ObjectId[];

    @IsOptional()
    @IsArray()
    @IsObjectId({ each: true })
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public importAreaIds: ObjectId[];

    @IsString()
    @IsIn(ImportRestrictionReason.members)
    @ApiModelProperty()
    public reason: ImportRestrictionReason;
}
