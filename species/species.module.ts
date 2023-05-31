import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesDalModule } from '@nst-smc/dal';

@Module({
    controllers: [SpeciesController],
    imports: [SpeciesDalModule]
})
export class SpeciesModule {}
