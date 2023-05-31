import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { VarietyGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class VarietyFiltersDto {
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

     // @ValidateNested()
     @IsOptional()
     @Type(() => IdFilterDto)
     @IsInstance(IdFilterDto)
     @ApiModelProperty()
     public speciesId: IdFilterDto;
 
     // @ValidateNested()
     @IsOptional()
     @Type(() => IdFilterDto)
     @IsInstance(IdFilterDto)
     @ApiModelProperty()
     public kindId: IdFilterDto;
 
     // @ValidateNested()
     @IsOptional()
     @Type(() => IdFilterDto)
     @IsInstance(IdFilterDto)
     @ApiModelProperty()
     public speciesClassId: IdFilterDto;

    public toVarietyGridFilters(): VarietyGridFilters {
        return new VarietyGridFilters(this);
    }
}
