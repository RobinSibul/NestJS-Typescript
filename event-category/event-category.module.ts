import { Module } from '@nestjs/common';
import { EventCategoryDalModule } from '../../dal/event-category-dal/event-category-dal.module';
import { EventCategoryController} from './event-category.controller';

@Module({
    controllers: [EventCategoryController],
    imports: [EventCategoryDalModule]
})
export class EventCategoryModule {}
