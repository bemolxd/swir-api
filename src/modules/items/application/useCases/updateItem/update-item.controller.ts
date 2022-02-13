import {
  Body,
  Controller,
  HttpException,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError } from 'shared/core';

import { ItemService } from '../../services';
import { CreateItemDto } from '../createItem';
import { UpdateItemErrors } from './update-item.errors';
import { UpdateItemResponse } from './update-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class UpdateItemController {
  constructor(private readonly itemService: ItemService) {}

  @Put('items/:itemId')
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() itemBodyDto: CreateItemDto,
  ) {
    try {
      const result: UpdateItemResponse = await this.itemService.updateItem({
        itemId,
        ...itemBodyDto,
      });

      if (result instanceof UpdateItemErrors.ItemNotFoundError) {
        return new NotFoundException(result.message);
      }

      return result;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
