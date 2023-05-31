import { Controller, Post, Body, Get, Headers, BadRequestException } from '@nestjs/common';
import { AuthService } from '@nst-smc/dal';
import { LoggedInUser, Secured, Anonymous } from '@rfx/nst-permissions';
import { LoginDto } from '../login-dto';
import { ForgotDto } from './dto/forgot-dto';
import { ResetDto } from './dto/reset-dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User, Permission, JwtPayload, JwtTokenType } from '@smc/api-common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, parseObjectId } from '@rfx/nst-db/mongo';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) {}

    @Post('login')
    @ApiOperation({ title: 'Login' })
    @Anonymous()
    public async login(
        @Body() loginDto: LoginDto
    ): Promise<{ token: string; refresh: string; }> {
        return this._authService.login(loginDto.email, loginDto.password);
    }

    @Post('forgotPassword')
    @ApiOperation({
        title: 'Forgot Password',
        description: `Send an email to the user with a token that can be used \
        to access the "resetPassword" endpoint for changing the user's password`
    })
    @Anonymous()
    public async forgotPassword(@Body() forgotDto: ForgotDto): Promise<void> {
        return this._authService.forgotPassword(forgotDto.email);
    }

    @Post('resetPassword')
    @ApiOperation({
        title: 'Reset Password',
        description: `Reset the password for the current user using a reset \
        token generated with the "forgotPassword" endpoint`
    })
    @ApiBearerAuth()
    @Secured(Permission.ResetPassword)
    public async resetPassword(
        @LoggedInUser() user: User,
        @Body() resetDto: ResetDto
    ): Promise<void> {
        // The permission required to access this endpoint is unlisted and
        // should not be put on any roles; it should only be given to the reset
        // token which should also have no other permissions. See the
        // JwtStrategy.validate() method for how it's used.
        return this._authService.resetPassword(user.profile.email, resetDto.password);
    }

    @Get('refresh')
    @ApiOperation({ title: 'Refresh access token' })
    @Anonymous()
    public async refresh(
        @Headers('authorization') bearerToken: string
    ): Promise<string> {
        const payload: JwtPayload = (new JwtService({})).decode(
            bearerToken.replace('Bearer ', '')
        ) as JwtPayload;

        if (payload.tokenType !== JwtTokenType.Refresh) {
            throw new BadRequestException('Refresh token required');
        }

        let userId: ObjectId = null;

        try {
            userId = parseObjectId(payload.userId);
        } catch (e) {
            throw new BadRequestException('Invalid token');
        }

        return this._authService.refresh(userId);
    }
}
