import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaDalModule } from '../../dal/';

@Module({
    controllers: [MediaController],
    imports: [MediaDalModule]
})
export class MediaModule {}
