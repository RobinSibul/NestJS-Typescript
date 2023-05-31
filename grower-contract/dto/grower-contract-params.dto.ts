import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GrowerContractGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { GrowerContractFiltersDto } from './grower-contract-filters.dto';

export class GrowerContractParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => GrowerContractFiltersDto)
    @IsInstance(GrowerContractFiltersDto)
    @ApiModelProperty()
    public filters: GrowerContractFiltersDto;

    public toGrowerContractGridParams(): GrowerContractGridParams {
        return new GrowerContractGridParams(this, this.filters);
    }
}
