import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { KindGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class KindFiltersDto {
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public nameSearch: StringFilterDto;

    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilterDto)
    @IsInstance(StringFilterDto)
    @ApiModelProperty()
    public numberSearch: StringFilterDto;

    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public speciesId: IdFilterDto;

    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public speciesClassId: IdFilterDto;

    public toKindGridFilters(): KindGridFilters {
        return new KindGridFilters(this);
    }
}
