import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    HttpCode,
    BadRequestException,
    Patch,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Secured, LoggedInUser } from '@rfx/nst-permissions';
import {
    UserProfile,
    FullUser,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    Event,
    Permission,
    UploadedFileObject
} from '@smc/api-common';
import { EventService } from '@nst-smc/dal';
import { ObjectId } from '@rfx/njs-db/mongo';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { EventParamsDto } from './dto/event-params.dto';
import { EventDto } from './dto/event.dto';
import { RecordedEventDto } from './dto/recorded-event.dto';
import { EventDocumentLargeDto } from './dto/event-document-large.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { L } from '@angular/cdk/keycodes';

@Controller('event')
export class EventController {
    constructor(private readonly _eventService: EventService) {}

    @Post('')
    @ApiOperation({ title: 'Create Event' })
    @ApiCreatedResponse({ description: 'Created Event', type: ObjectId })
    @Secured(Permission.EventCreate)
    public async createEvent(
        @Body() dto: EventDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._eventService.createEvent(dto, rEnt);
    }

    @Post('list')
    @ApiOperation({
        title: ' Event List'
    })
    @ApiOkResponse({
        description: 'Paginated list of Field',
        type: [Event]
    })
    @Secured(Permission.EventView)
    public async listGrid(
        @Body() dto: EventParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<Event>> {
        return this._eventService.getGridEvent(dto.toEventGridParams(), rEnt);
    }

    @Get('selectOptions')
    @ApiOperation({
        title: 'Event Selection List',
        description: 'List of  Events for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of Event select options'
    })
    @Secured(Permission.EventView)
    public async getEventSelectOptions(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<SelectOption<ObjectId>[]> {
        return this._eventService.getEventSelectOptions(rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Event By Id' })
    @Secured(Permission.EventView)
    public async getEvent(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Event> {
        return this._eventService.getEventById(idDto.id, rEnt);
    }

    @Get('')
    @ApiOperation({ title: 'Get All Events' })
    @Secured(Permission.EventView)
    public async getEventsByCategory(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<Event[]> {
        return this._eventService.getEventsByCategory(rEnt);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Event' })
    @Secured(Permission.EventEdit)
    public async editEvent(
        @Param() idDto: IdDto,
        @Body() dto: EventDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._eventService.editEvent(idDto.id, dto, rEnt);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Event' })
    @Secured(Permission.EventDelete)
    public async deleteEvent(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._eventService.deleteEventById(idDto.id, rEnt);
    }
}
