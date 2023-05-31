import { Module } from '@nestjs/common';
import { EventDalModule, LotDalModule, NotificationDalModule } from '@nst-smc/dal';
import { NotificationController } from './notification.controller';

@Module({
    controllers: [NotificationController],
    imports: [NotificationDalModule, LotDalModule, EventDalModule]
})
export class NotificationModule {}
