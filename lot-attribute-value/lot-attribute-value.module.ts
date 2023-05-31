import { Module } from '@nestjs/common';
import { LotAttributeValueController } from './lot-attribute-value.controller';
import { LotAttributeValueDalModule } from '@nst-smc/dal';

@Module({
    controllers: [LotAttributeValueController],
    imports: [LotAttributeValueDalModule]
})
export class LotAttributeModule {}
