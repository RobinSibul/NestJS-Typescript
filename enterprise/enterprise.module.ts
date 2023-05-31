import { Module } from '@nestjs/common';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseDalModule } from '../../dal/';

@Module({
    controllers: [EnterpriseController],
    imports: [EnterpriseDalModule]
})
export class EnterpriseModule {}
