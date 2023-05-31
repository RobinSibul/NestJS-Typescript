import { Module } from '@nestjs/common';
import { GrowerContractController } from './grower-contract.controller';
import { GrowerContractDalModule } from '@nst-smc/dal';

@Module({
    controllers: [GrowerContractController],
    imports: [GrowerContractDalModule]
})
export class GrowerContractModule {}
