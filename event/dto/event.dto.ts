import { ApiModelProperty } from '@nestjs/swagger';
import { IsObjectId, ObjectId, transformObjectIdList } from '@rfx/nst-db/mongo';
import {
    EventIdentityWithoutIds,
    CustomFieldWithoutIds,
    EventCategoryWithoutIds,
    LotAttributeWithoutIds
} from '@smc/common';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';

export class EventDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsArray()
    @Transform(transformObjectIdList)
    @ApiModelProperty()
    public category: ObjectId[];

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    public oneTimeEvent: boolean;

    @IsString()
    @ApiModelProperty()
    public description: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    public lotStatus: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    public notified: boolean;

    @IsOptional()
    @IsObjectId()
    @ApiModelProperty()
    public parentEventId: EventIdentityWithoutIds;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    public days: number;

    @IsOptional()
    @IsArray()
    @ApiModelProperty()
    public requiredDataItems: LotAttributeWithoutIds[];

    @IsOptional()
    @IsArray()
    @ApiModelProperty()
    public customFields: CustomFieldWithoutIds[];
}
