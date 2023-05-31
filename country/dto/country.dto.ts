import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CountryDto {
    @IsString()
    @ApiModelProperty()
    public name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public description: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
