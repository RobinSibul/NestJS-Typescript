import { Module } from '@nestjs/common';
import { CustomerContractController } from './customer-contract.controller';
import { CustomerContractDalModule } from '@nst-smc/dal';

@Module({
    controllers: [CustomerContractController],
    imports: [CustomerContractDalModule]
})
export class CustomerContractModule {}
