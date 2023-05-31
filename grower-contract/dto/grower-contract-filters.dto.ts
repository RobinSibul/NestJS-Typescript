import { ValidateNested, IsInstance, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { GrowerContractGridFilters } from '@smc/api-common';
import { StringFilterDto } from '@rfx/nst-common';
import { IdFilterDto } from '@rfx/nst-db/mongo';

export class GrowerContractFiltersDto {
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

    /*
        TODO: IdFilterDto needs to be updated
        to accept null object ids as valid
    */
    // @ValidateNested()
    @IsOptional()
    @Type(() => IdFilterDto)
    @IsInstance(IdFilterDto)
    @ApiModelProperty()
    public growerId: IdFilterDto;

    public toGrowerContractGridFilters(): GrowerContractGridFilters {
        return new GrowerContractGridFilters(this);
    }
}
