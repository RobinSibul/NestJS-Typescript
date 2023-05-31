import { Module } from '@nestjs/common';
import { PlantSequenceController } from './plant-sequence.controller';
import { PlantSequenceDalModule } from '@nst-smc/dal';

@Module({
    controllers: [PlantSequenceController],
    imports: [PlantSequenceDalModule]
})
export class PlantSequenceModule {}
