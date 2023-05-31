import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { EventService, LotService, NotificationService } from "@nst-smc/dal";
import { PaginatedListModel, SelectOption } from "@rfx/common";
import { IdDto, ObjectId } from "@rfx/nst-db/mongo";
import {  Anonymous, LoggedInUser, Secured, WildCardPermission } from "@rfx/nst-permissions";
import { EnterpriseIdentity, Notification,  Permission,  RequestEnterprise, User } from "@smc/api-common";
import { rename } from "fs";
import { IdListDto } from "../id-list.dto";
import { NotificationParamsDto } from "./dto/notification-params.dto";
import { NotificationTemplateCreateDto } from "./dto/notification-template-create.dto";





@ApiUseTags('Notification')
@Controller('notification')
export class NotificationController {
    constructor(
        public _notificationService: NotificationService,
        public _lotService: LotService,
        public _eventService: EventService
    ) { }
    
    @Post('list')
    @ApiOperation({
        title: 'Notification List',
        description: 'List all active Notifications for logged in enterprise'
    })
    @Secured(WildCardPermission)
    public async listGrid(
        @Body() notificationParamsDto: NotificationParamsDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity,
    ): Promise<PaginatedListModel<Notification>> {
        const params = notificationParamsDto.toNotificationGridParams();
        return this._notificationService.getGridNotifications(
            params,
            rEnt._id
        )
    }

    @Delete(':id')
    @ApiOperation({
        title: 'Delete Notification'
    })
    @Secured(Permission.LotEventEdit)
    public async deleteNotification(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._notificationService.deleteNotificationById(idDto.id, rEnt);
    }

    @Post('')
    @ApiOperation({
        title: 'Create Notification'
    })
    @Secured(WildCardPermission)
    public async createNotification(
        @Body() dto: NotificationTemplateCreateDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        const lotIdentity = await this._lotService.getLotById(dto.lot, rEnt);
        const eventIdentity = await this._eventService.getEventById(dto.eventTemplate, rEnt);
        return this._notificationService.createNotification(dto, rEnt, lotIdentity, eventIdentity);
    }

    @Post('record')
    @ApiOperation({
        title: 'Create Record Notification'
    })
    @Secured(WildCardPermission)
    public async createRecordNotification(
        @Body() dto: NotificationTemplateCreateDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<ObjectId> {
        const lotIdentity = await this._lotService.getLotById(dto.lot, rEnt);
        const eventIdentity = await this._eventService.getEventById(dto.eventTemplate, rEnt);
        return this._notificationService.createRecordNotification(dto, rEnt, lotIdentity, eventIdentity);
    }


    @Post('markRead/:id')
    @ApiOperation({ title: 'Mark notification(s) read' })
    @ApiOkResponse({ description: 'Notification(s) Marked as Read' })
    @Secured(WildCardPermission)
    public async markNotificationRead(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<void> {
        return this._notificationService.markRead(idDto.id, rEnt._id);
    }

    @Get('unreadCount')
    @ApiOperation({ title: 'Get Number of Unread Notifications' })
    @Secured(WildCardPermission)
    public async getUnreadCount(
        @RequestEnterprise() rEnt: EnterpriseIdentity
    ): Promise<number> {
        return this._notificationService.getUnreadCount( rEnt._id);
    }

    @Get('systemWide')
    @ApiOperation({ title: 'Get current system wide notification' })
    @Secured(WildCardPermission)
    public async getSystemWideNotification(): Promise<Notification> {
        return this._notificationService.getSystemWideNotification();
    }

}