import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDalModule } from '@nst-smc/dal';

@Module({
    controllers: [UserController],
    imports: [UserDalModule]
})
export class UserModule {}
