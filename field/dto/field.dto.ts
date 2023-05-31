import { IsString, IsOptional, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { MaxLatitude, MinLatitude, MaxLongitude, MinLongitude } from '@smc/common';

export class FieldDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public growerId: ObjectId;

    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public hectares: number;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public countryId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public areaId: ObjectId;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public territory: string;

    @IsOptional()
    @IsNumber()
    @Max(MaxLatitude)
    @Min(MinLatitude)
    @ApiModelProperty()
    public latitude: number;

    @IsOptional()
    @IsNumber()
    @Max(MaxLongitude)
    @Min(MinLongitude)
    public longitude: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
