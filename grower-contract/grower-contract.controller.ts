import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    BadRequestException
} from '@nestjs/common';
import {
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse
} from '@nestjs/swagger';
import { Secured, LoggedInUser } from '@rfx/nst-permissions';
import {
    Permission,
    UserProfile,
    FullUser,
    GrowerContract,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    Lot
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import { GrowerContractService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { GrowerContractDto } from './dto/grower-contract.dto';
import { GrowerContractParamsDto } from './dto/grower-contract-params.dto';
import { LotDto } from './dto/lot.dto';
import { LotSurfaceSplitDto } from './dto/lot-surface-split.dto';
import { LotWeightSplitDto } from './dto/lot-weight-split.dto';

@Controller('growerContract')
export class GrowerContractController {
    constructor(
        private readonly _growerContractService: GrowerContractService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create GrowerContract' })
    @ApiCreatedResponse({ description: 'GrowerContract', type: ObjectId })
    @Secured(Permission.GrowerContractCreate)
    public async createGrowerContract(
        @Body() dto: GrowerContractDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._growerContractService.createGrowerContract(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'GrowerContract List',
        description: 'List GrowerContract'
    })
    @ApiOkResponse({
        description: 'Paginated list of GrowerContract',
        type: [GrowerContract]
    })
    @Secured(Permission.GrowerContractView)
    public async listGrid(
        @Body() dto: GrowerContractParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<GrowerContract>> {
        return await this._growerContractService.getGridGrowerContract(
            dto.toGrowerContractGridParams(),
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'GrowerContract Selection List',
        description: 'List of growerContract for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of growerContract select options'
    })
    @Secured(Permission.GrowerContractView)
    public async getGrowerContractSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._growerContractService.getGrowerContractSelectOptions(rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get GrowerContract by Id' })
    @Secured(Permission.GrowerContractView)
    public async getGrowerContract(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<GrowerContract> {
        return this._growerContractService.getGrowerContractById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit GrowerContract' })
    @Secured(Permission.GrowerContractEdit)
    public async editGrowerContract(
        @Param() idDto: IdDto,
        @Body() dto: GrowerContractDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._growerContractService.editGrowerContract(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete GrowerContract By Id' })
    @Secured(Permission.GrowerContractDelete)
    public async deleteGrowerContract(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._growerContractService.deleteGrowerContractById(idDto.id, rEnt);
    }


    @Post(':id/lot')
    @ApiOperation({ title: 'Create Lot' })
    @Secured(Permission.LotCreate)
    public async createLot(
        @Param() idDto: IdDto,
        @Body() dto: LotDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Lot> {
        return this._growerContractService.createLot(idDto.id, dto, rEnt, lUser);
    }

    @Put(':gcid/lot/:lid')
    @ApiOperation({ title: 'Edit Lot' })
    @Secured(Permission.LotEdit)
    public async editLot(
        @Param('gcid') gcid: string,
        @Param('lid') lid: string,
        @Body() dto: LotDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Lot> {

        let growerContractId, lotId;
        try {
            growerContractId = new ObjectId(gcid);
            lotId = new ObjectId(lid);
        } catch (e) {
            throw new BadRequestException('Invalid Id', e);
        }
        return this._growerContractService.editLot(growerContractId, lotId, dto, rEnt, lUser);
    }

    @Delete(':gcId/lot/:lId')
    @ApiOperation({ title: 'Delete Lot' })
    @Secured(Permission.LotDelete)
    public async deleteLot(
        @Param('gcId') gcId: string,
        @Param('lId') lId: string,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        let growerContractId, lotId;
        try {
            growerContractId = parseObjectId(gcId);
            lotId = parseObjectId(lId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._growerContractService.deleteLot(growerContractId, lotId, rEnt);
    }

    @Post(':gcId/lot/:lId/weightSplit')
    @ApiOperation({ title: 'Split lot weight' })
    @ApiOkResponse({ description: 'Lot weight was split' })
    @Secured(Permission.LotEdit)
    public async splitWeightLot(
        @Param('gcId') gcId: string,
        @Param('lId') lId: string,
        @Body() dto: LotWeightSplitDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Lot[]> {
        let growerContractId, lotId;
        try {
            growerContractId = parseObjectId(gcId);
            lotId = parseObjectId(lId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._growerContractService.splitWeightLot(growerContractId, lotId, dto, rEnt, lUser);
    }
    @Post(':gcId/lot/:lId/surfaceSplit')
    @ApiOperation({ title: 'Split lot surface' })
    @ApiOkResponse({ description: 'Lot surface was split' })
    @Secured(Permission.LotEdit)
    public async splitSurfaceLot(
        @Param('gcId') gcId: string,
        @Param('lId') lId: string,
        @Body() dto: LotSurfaceSplitDto,
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Lot[]> {
        let growerContractId, lotId;
        try {
            growerContractId = parseObjectId(gcId);
            lotId = parseObjectId(lId);
        } catch (e) {
            throw new BadRequestException('Invalid Id');
        }
        return this._growerContractService.splitSurfaceLot(growerContractId, lotId, dto, rEnt, lUser);
    }

    @Post('count')
    @ApiOperation({
        title: 'Grower Count',
        description: 'Count Grower'
    })
    @ApiOkResponse({
        description: 'Count of Grower',
        type: [GrowerContract]
    })
    @Secured(Permission.VarietyView)
    public async countVariety(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Object> {
        return await this._growerContractService.getGrowerCount(
            rEnt
        );
    }
}
