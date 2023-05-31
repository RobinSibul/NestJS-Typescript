import { IsString, IsOptional, IsNumber, IsDate, IsIn, IsPositive, ValidateNested, IsInstance } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';
import { MeasuredQuantityDto } from '../../measured-quantity.dto';

export class CustomerLineItemDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public varietyId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public slidingScaleId: ObjectId;


    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public deliveryCountryId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public deliveryAreaId: ObjectId;

    @ValidateNested()
    @Type(() => MeasuredQuantityDto)
    @IsInstance(MeasuredQuantityDto)
    @ApiModelProperty()
    public quantity: MeasuredQuantityDto;

    @IsString()
    @ApiModelProperty()
    public isolation: string;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public isolationUnit: ObjectId;

    @IsString()
    @ApiModelProperty()
    public germination: string;

    @IsString()
    @ApiModelProperty()
    public physicalPurity: string;

    @IsString()
    @ApiModelProperty()
    public geneticPurity: string;

    @IsNumber()
    @IsPositive()
    @ApiModelProperty()
    public price: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public overproductionClause: string;

    @IsDate()
    @Transform(d => new Date(d))
    @ApiModelProperty()
    public startDate: Date;

    @IsDate()
    @Transform(d => new Date(d))
    @ApiModelProperty()
    public deliveryDate: Date;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
