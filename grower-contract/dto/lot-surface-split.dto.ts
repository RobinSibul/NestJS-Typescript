import { IsArray, ArrayMinSize, IsNumber, IsPositive, Max, NotEquals } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { LotSurfaceSplitChildDto } from './lot-surface-split-child.dto';

export class LotSurfaceSplitDto {

    @IsNumber()
    @IsPositive()
    @Max(1)
    @NotEquals(1)
    // tslint:disable-next-line: no-magic-numbers
    @Transform(perc => perc / 100)
    public parentLotSurfacePercentage: number;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => LotSurfaceSplitChildDto)
    public childLotPercentages: LotSurfaceSplitChildDto[];
}
