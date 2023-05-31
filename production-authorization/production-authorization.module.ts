import { Module } from '@nestjs/common';
import { ProductionAuthorizationController } from './production-authorization.controller';
import { ProductionAuthorizationDalModule } from '@nst-smc/dal';

@Module({
    controllers: [ProductionAuthorizationController],
    imports: [ProductionAuthorizationDalModule]
})
export class ProductionAuthorizationModule {}
