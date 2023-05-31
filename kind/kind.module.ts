import { Module } from '@nestjs/common';
import { KindController } from './kind.controller';
import { KindDalModule } from '@nst-smc/dal';

@Module({
    controllers: [KindController],
    imports: [KindDalModule]
})
export class KindModule {}
