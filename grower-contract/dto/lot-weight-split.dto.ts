import { IsArray, ArrayMinSize, IsNumber, IsPositive, Max, NotEquals } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { LotWeightSplitChildDto } from './lot-weight-split-child.dto';

export class LotWeightSplitDto {

    @IsNumber()
    @IsPositive()
    @Max(1)
    @NotEquals(1)
    // tslint:disable-next-line: no-magic-numbers
    @Transform(perc => perc / 100)
    public parentLotWeightPercentage: number;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => LotWeightSplitChildDto)
    public childLotPercentages: LotWeightSplitChildDto[];
}
