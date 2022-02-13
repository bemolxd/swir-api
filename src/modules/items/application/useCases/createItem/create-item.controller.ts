import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
} from '@nestjs/common';
import { AppError } from 'shared/core';

import { ItemService } from '../../services';
import { CreateItemDto } from './create-item.dto';
import { CreateItemErrors } from './create-item.errors';
import { CreateItemResponse } from './create-item.use-case';

@Controller()
export class CreateItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('items')
  async createItem(@Body() createItemDto: CreateItemDto) {
    try {
      const result: CreateItemResponse = await this.itemService.createItem(
        createItemDto,
      );

      if (result instanceof CreateItemErrors.ItemAlreadyExists) {
        return new BadRequestException(result.message);
      }

      return result;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
