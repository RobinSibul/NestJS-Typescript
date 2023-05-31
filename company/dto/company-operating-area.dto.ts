import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId, transformObjectId, IsObjectId } from '@rfx/nst-db/mongo';

export class CompanyOperatingAreaDto {
    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public countryId: ObjectId;

    @IsObjectId()
    @Transform(transformObjectId)
    @ApiModelProperty()
    public areaId: ObjectId;
}
