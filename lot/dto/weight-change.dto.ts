import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class WeightChangeDto {
    @IsNumber()
    @ApiModelProperty()
    public weight: number;
}