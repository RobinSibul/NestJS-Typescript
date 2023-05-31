import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryDalModule } from '@nst-smc/dal';
@Module({
    controllers: [CountryController],
    imports: [CountryDalModule]
})
export class CountryModule {}
