import { Module } from '@nestjs/common';
import { SlidingScaleController } from './slidingScale.Controller';
import { SlidingScaleDalModule } from '@nst-smc/dal';

@Module({
    controllers: [SlidingScaleController],
    imports: [SlidingScaleDalModule]
})
export class SlidingScaleModule {}
