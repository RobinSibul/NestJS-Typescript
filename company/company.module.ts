import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyDalModule } from '@nst-smc/dal';

@Module({
    controllers: [CompanyController],
    imports: [CompanyDalModule]
})
export class CompanyModule {}
