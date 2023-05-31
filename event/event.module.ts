import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventDalModule } from '@nst-smc/dal';

@Module({
    controllers: [EventController],
    imports: [EventDalModule]
})
export class EventModule {}
