import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { KindGridParams } from '@smc/api-common';
import { GridParamsDto } from '@rfx/nst-common';
import { KindFiltersDto } from './kind-filters.dto';

export class KindParamsDto extends GridParamsDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => KindFiltersDto)
    @IsInstance(KindFiltersDto)
    @ApiModelProperty()
    public filters: KindFiltersDto;

    public toKindGridParams(): KindGridParams {
        return new KindGridParams(this, this.filters);
    }
}
