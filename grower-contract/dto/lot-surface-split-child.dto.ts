import { IsNumber, IsPositive, Max, NotEquals } from 'class-validator';
import { Transform } from 'class-transformer';

export class LotSurfaceSplitChildDto {
    @IsNumber()
    @IsPositive()
    @Max(1)
    @NotEquals(1)
    // tslint:disable-next-line: no-magic-numbers
    @Transform(perc => perc / 100)
    public surfacePercentage: number;
}
