import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { Secured } from '@rfx/nst-permissions';
import { EnterpriseIdentity, EventCategory, RequestEnterprise } from '@smc/api-common';
import { Permission } from '@smc/common';
import { EventCategoryService } from '@nst-smc/dal';
import { EventCategoryParamsDto } from './dto/event-category-params.dto';
import { ObjectId } from '@rfx/njs-db/mongo';
import { EventCategoryDto } from './dto/event-category.dto';
import { IdDto } from '@rfx/nst-db/mongo';

@Controller('category')
export class EventCategoryController {
    constructor(private readonly _eventCategoryService: EventCategoryService) {}

    @Post('list')
    @ApiOperation({
        title: 'Event Category List'
    })
    @ApiOkResponse({
        description: 'Paginated list of event catagories',
        type: [EventCategory]
    })
    @Secured(Permission.EventCategoryView)
    public async listGrid(
        @Body() dto: EventCategoryParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<EventCategory>> {
        return this._eventCategoryService.getGridEventCategory(
            dto.toEventCategoryGridParams(),
            rEnt
        );
    }

    @Post('')
    @ApiOperation({ title: 'Create Event Category' })
    @ApiCreatedResponse({ description: 'Event Category', type: ObjectId })
    @Secured(Permission.EventCategoryCreate)
    public async createEventCategory(
        @Body() dto: EventCategoryDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._eventCategoryService.createEventCategory(dto, rEnt);
    }

    @Get('selectOptions')
    @ApiOperation({
        title: 'Event Category Selection List',
        description: 'List of event catagories for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of event category select options'
    })
    @Secured(Permission.EventCategoryView)
    public async getEventCategorySelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._eventCategoryService.getEventCategorySelectOptions(rEnt);
    }

    @Get('selectOptions/children/:id')
    @ApiOperation({
        title: 'Event Category Children Selection List',
        description: 'List of event catagory children for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of event category child select options'
    })
    @Secured(Permission.EventCategoryView)
    public async getEventCategorySelectOptionChildren(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._eventCategoryService.getEventCategorySelectOptionChildren(idDto.id, rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Event Category by Id' })
    @Secured(Permission.EventCategoryView)
    public async getEventCategory(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<EventCategory> {
        return this._eventCategoryService.getEventCategoryById(idDto.id, rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Event Category' })
    @Secured(Permission.EventCategoryEdit)
    public async editEventCategory(
        @Param() idDto: IdDto,
        @Body() dto: EventCategoryDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._eventCategoryService.editEventCategory(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Event Category' })
    @Secured(Permission.EventCategoryDelete)
    public async deleteEventCategory(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._eventCategoryService.deleteEventCategoryById(idDto.id, rEnt);
    }
}
