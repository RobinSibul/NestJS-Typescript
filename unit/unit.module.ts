import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitDalModule } from '@nst-smc/dal';

@Module({
    controllers: [UnitController],
    imports: [UnitDalModule]
})
export class UnitModule {}
