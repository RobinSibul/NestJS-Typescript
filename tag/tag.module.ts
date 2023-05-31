import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagDalModule } from '@nst-smc/dal';

@Module({
    controllers: [TagController],
    imports: [TagDalModule]
})
export class TagModule {}
