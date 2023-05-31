import { IsString, IsIn, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SpeciesDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;
}
