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

export class SlidingScaleDto {

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public clause: string;
}
