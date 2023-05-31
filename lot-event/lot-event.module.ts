import { Module } from '@nestjs/common';
import { LotEventController } from './lot-event.controller';
import { LotEventDalModule } from '@nst-smc/dal';

@Module({
    controllers: [LotEventController],
    imports: [LotEventDalModule]
})
export class LotEventModule {}
