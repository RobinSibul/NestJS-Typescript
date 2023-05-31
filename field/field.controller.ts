import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete
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
    Field,
    User,
    RequestEnterprise,
    EnterpriseIdentity
} from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { FieldService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { FieldDto } from './dto/field.dto';
import { FieldParamsDto } from './dto/field-params.dto';

@Controller('field')
export class FieldController {
    constructor(
        private readonly _fieldService: FieldService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Field' })
    @ApiCreatedResponse({ description: 'Field', type: ObjectId })
    @Secured(Permission.FieldCreate)
    public async createField(
        @Body() dto: FieldDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._fieldService.createField(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: 'Field List',
        description: 'List Field'
    })
    @ApiOkResponse({
        description: 'Paginated list of Field',
        type: [Field]
    })
    @Secured(Permission.FieldView)
    public async listGrid(
        @Body() dto: FieldParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Field>> {
        return await this._fieldService.getGridField(
            dto.toFieldGridParams(),
            rEnt
        );
    }

    @Get('/selectOptions')
    @ApiOperation({
        title: 'Field Selection List',
        description: 'List of field for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of field select options'
    })
    @Secured(Permission.FieldView)
    public async getFieldSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._fieldService.getFieldSelectOptions(rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Field by Id' })
    @Secured(Permission.FieldView)
    public async getField(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Field> {
        return this._fieldService.getFieldById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Field' })
    @Secured(Permission.FieldEdit)
    public async editField(
        @Param() idDto: IdDto,
        @Body() dto: FieldDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._fieldService.editField(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Field By Id' })
    @Secured(Permission.FieldDelete)
    public async deleteField(
        @Body() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._fieldService.deleteFieldById(idDto.id, rEnt);
    }
}
