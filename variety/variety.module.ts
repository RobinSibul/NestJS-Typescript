import { Module } from '@nestjs/common';
import { VarietyController } from './variety.controller';
import { VarietyDalModule } from '@nst-smc/dal';

@Module({
    controllers: [VarietyController],
    imports: [VarietyDalModule]
})
export class VarietyModule {}
