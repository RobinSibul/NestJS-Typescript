import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LotEventNotesDto {
    @IsString()
    @ApiModelProperty()
    public notes: string;
}
