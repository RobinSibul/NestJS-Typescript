import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '@nst-smc/dal';
import { LoggedInUser, Secured, Anonymous, WildCardPermission } from '@rfx/nst-permissions';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { User, Permission, RequestEnterprise, EnterpriseIdentity } from '@smc/api-common';
import { PaginatedListModel } from '@rfx/common';
import { GridParamsDto } from '@rfx/nst-common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEditDto } from './dto/user-edit.dto';
import { ObjectId, IdDto } from '@rfx/nst-db/mongo';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get('')
    @ApiOperation({ title: 'Get Logged In User' })
    @Secured(Permission.UserView)
    public async getLoggedInUser(
        @LoggedInUser() user: User
    ): Promise<User> {
        return user;
    }

    @Post('list')
    @ApiOperation({ title: 'User List' })
    @Secured(Permission.UserView)
    public async listUsers(
        @Body() dto: GridParamsDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<PaginatedListModel<User>> {
        const params = dto.toGridParams();
        return this._userService.getGridUsers(params, rEnterprise);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete User By Id' })
    @Secured(Permission.UserDelete)
    public async deleteUser(
        @Param() idDto: IdDto,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<void> {
        return this._userService.deleteUser(idDto.id, rEnterprise);
    }

    @Put('seenWelcomeModal')
    @ApiOperation({ title: 'Mark that the user has seen the welcome modal' })
    @Secured(WildCardPermission)
    public seenWelcomeModal(
        @LoggedInUser() user: User,
        @RequestEnterprise() rEnterprise: EnterpriseIdentity
    ): Promise<void> {
        return this._userService.seenWelcomeModal(user);
    }
}
