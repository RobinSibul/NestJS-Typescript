import { Module } from '@nestjs/common';
import { LotController } from './lot.controller';
import { LotDalModule } from '@nst-smc/dal';

@Module({
    controllers: [LotController],
    imports: [LotDalModule]
})
export class LotModule {}
