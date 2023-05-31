import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Secured, WildCardPermission } from '@rfx/nst-permissions';
import { RequestEnterprise, EnterpriseIdentity, Enterprise } from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { EnterpriseService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';

@Controller('enterprise')
export class EnterpriseController {
    constructor(private readonly _enterpriseService: EnterpriseService) {}

    @Get('')
    @ApiOperation({ title: 'Get User Enterprise' })
    @Secured(WildCardPermission)
    public async getOwnEnterprise(
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<Enterprise> {
        return this._enterpriseService.getEnterpriseById(rEnterprise._id);
    }
}
