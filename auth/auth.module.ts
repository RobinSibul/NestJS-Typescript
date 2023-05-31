import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthDalModule } from '@nst-smc/dal';

@Module({
    controllers: [AuthController],
    imports: [AuthDalModule]
})
export class AuthModule {}
