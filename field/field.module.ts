import { Module } from '@nestjs/common';
import { FieldController } from './field.controller';
import { FieldDalModule } from '@nst-smc/dal';

@Module({
    controllers: [FieldController],
    imports: [FieldDalModule]
})
export class FieldModule {}
