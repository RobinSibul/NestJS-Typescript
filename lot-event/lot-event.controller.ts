import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    UploadedFile,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Secured, LoggedInUser, Anonymous } from '@rfx/nst-permissions';
import {
    Permission,
    UserProfile,
    FullUser,
    ILotEvent,
    User,
    RequestEnterprise,
    EnterpriseIdentity,
    UploadedFileObject,
    CreatedLotEvent
} from '@smc/api-common';
import { ObjectId } from '@rfx/njs-db/mongo';
import { LotEventService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { LotEventParamsDto } from './dto/lot-event-params.dto';
import { LotEventNotesDto } from './dto/lot-event-notes.dto';
import { RecordedEventDto } from '../event/dto/recorded-event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('lotEvent')
export class LotEventController {
    constructor(private readonly _lotEventService: LotEventService) {}

    @Post('record')
    @ApiOperation({ title: 'Record an Event' })
    @ApiCreatedResponse({ description: 'Event', type: ObjectId })
    @Secured(Permission.LotEventView)
    @UseInterceptors(FilesInterceptor('files[]'))
    public async recordEvent(
        @Body() dto: RecordedEventDto,
        @UploadedFiles() files: UploadedFileObject[],
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._lotEventService.recordEvent(dto, lUser, files, rEnt);
    }

    @Post('update/:id')
    @ApiOperation({ title: 'Record a Lot Event' })
    @ApiCreatedResponse({ description: 'Lot Event', type: ObjectId })
    @Secured(Permission.LotEventView)
    @UseInterceptors(FilesInterceptor('files[]'))
    public async updateLotEvent(
        @Param() idDto: IdDto,
        @Body() dto: RecordedEventDto,
        @UploadedFiles() files: UploadedFileObject[],
        @LoggedInUser() lUser: User,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        return this._lotEventService.recordEvent(dto, lUser, files, rEnt, idDto.id);
    }

    @Post('list')
    @ApiOperation({
        title: 'LotEvent List',
        description: 'List LotEvent'
    })
    @ApiOkResponse({ description: 'Paginated list of LotEvent' })
    @Secured(Permission.LotEventView)
    public async listGrid(
        @Body() dto: LotEventParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<PaginatedListModel<ILotEvent>> {
        return this._lotEventService.getGridLotEvent(dto.toLotEventGridParams(), rEnt);
    }

    @Get(':id')
    @ApiOperation({ title: 'LotEvent By ID' })
    @ApiOkResponse({ description: 'Get single lot event by lot event id' })
    @Secured(Permission.LotEventView)
    public async getLotEventById(@Param() idDto: IdDto): Promise<ILotEvent> {
        return this._lotEventService.getLotEventById(idDto.id);
    }

    @Get('lot/:id')
    @ApiOperation({ title: 'Get Lot Events By Lot Id' })
    @ApiOkResponse({ description: 'List of lot events for a specific lot' })
    @Secured(Permission.LotView)
    public async getLotEventsById(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt
    ): Promise<ILotEvent[]> {
        return this._lotEventService.getLotEventByLotId(idDto.id);
    }

    @Post('notes/:id')
    @ApiOperation({ title: 'Update lot event notes' })
    @ApiOkResponse({ description: 'Notes updated' })
    @Secured(Permission.LotEventEdit)
    public async editLotEventNotes(
        @Param() idDto: IdDto,
        @Body() dto: LotEventNotesDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._lotEventService.editLotEventNotes(idDto.id, dto, rEnt);
    }
}
