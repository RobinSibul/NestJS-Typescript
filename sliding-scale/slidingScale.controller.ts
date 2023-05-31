import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    Query,
    BadRequestException
} from '@nestjs/common';
import {
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse
} from '@nestjs/swagger';
import { Secured, LoggedInUser } from '@rfx/nst-permissions';
import {
    Permission,
    SlidingScale,
} from '@smc/api-common';
import { ObjectId, parseObjectId } from '@rfx/njs-db/mongo';
import {SlidingScaleService } from '@nst-smc/dal';
import { IdDto } from '@rfx/nst-db/mongo/src';
import { PaginatedListModel, SelectOption } from '@rfx/common';
import { IdListDto } from '../id-list.dto';
import { SlidingScaleDto } from './dto/slidingScale.dto';
import { SlidingScaleParamsDto } from './dto/SlidingScale-params.dto';

@Controller('slidingScale')
export class SlidingScaleController {
    constructor(
        private readonly _slidingScaleService: SlidingScaleService
    ) {}

    @Post('')
    @ApiOperation({ title: 'Create Sliding Scale' })
    @ApiCreatedResponse({ description: 'Sliding Scale', type: ObjectId })
    @Secured(Permission.CompanyCreate)
    public async createSlidingScale(
        @Body() dto: SlidingScaleDto
    ): Promise<ObjectId> {
        return this._slidingScaleService.createSlidingScaleData(dto);
    }
    
    @Post('list')
    @ApiOperation({
        title: 'Sliding Scale List',
        description: 'List Sliding Scale'
    })
    @ApiOkResponse({
        description: 'Paginated list of Sliding Scales',
        type: [SlidingScale]
    })
    @Secured(Permission.CompanyView)
    public async listGrid(
        @Body() dto: SlidingScaleParamsDto): Promise<PaginatedListModel<SlidingScale>> {
        return await this._slidingScaleService.getGridSlidingScales(
            dto.toSlidingScaleGridParams()
            );
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Sliding Scale by Id' })
    @Secured(Permission.CompanyView)
    public async getSlidingScale(
        @Param() idDto: IdDto): Promise<SlidingScale> {
        return this._slidingScaleService.getSlidingScaleById(idDto.id);
    }

    @Put(':id')
    @ApiOperation({ title: 'Edit Sliding Scale' })
    @Secured(Permission.CompanyEdit)
    public async editSlidingScale(
        @Param() idDto: IdDto,
        @Body() dto: SlidingScaleDto
        ): Promise<void> {
        return this._slidingScaleService.editSlidingScale(
            idDto.id,
            dto
        );
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete Sliding Scale by Id' })
    @Secured(Permission.CompanyDelete)
    public async deleteSlidingScale(
        @Body() idDto: IdDto): Promise<void> {
        return this._slidingScaleService.deleteSlidingScale(idDto.id);
    }



    @Post('/selectOptions')
    @ApiOperation({
        title: 'Sliding Scale Selection List',
        description: 'List of sliding scales for dropdown use'
    })
    @ApiOkResponse({
        description: 'List of sliding scale select options'
    })
    @Secured(Permission.CompanyView)
    public async getSlidingScaleSelectOptions(): Promise<SelectOption<ObjectId>[]> {
        return this._slidingScaleService.getSlidingScaleSelectOptions();
    }
}
