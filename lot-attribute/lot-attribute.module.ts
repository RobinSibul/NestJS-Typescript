import { Module } from '@nestjs/common';
import { LotAttributeController } from './lot-attribute.controller';
import { LotAttributeDalModule } from '@nst-smc/dal';

@Module({
    controllers: [LotAttributeController],
    imports: [LotAttributeDalModule]
})
export class LotAttributeModule {}
