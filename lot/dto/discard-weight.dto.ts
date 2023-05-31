import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class DiscardWeightDto {
    @IsNumber()
    weight: number;
}