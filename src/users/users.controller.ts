import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { PaginationDTO } from '../common/dto/pagination.dto';
import { IPaginationResponse } from '../common/dto/response.with.pagonation.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UniversalResponseInterceptor } from '../common/dto/universal-response.interceptor';
import { EmailValidationPipe } from '../common/validation-pipes/email.validator';
import { StatusValidation } from './validation-pipes/status.validator';
import { UserStatuses } from './enums';
import { descritionForStatuses } from './helper';

@Controller('users')
@ApiTags('users')
@UseInterceptors(UniversalResponseInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getUsers(
    @Query() query: PaginationDTO,
  ): Promise<IPaginationResponse<UserResponseDto[]>> {
    return this.userService.getAll(query);
  }

  @Get('/filter-by-name/:name')
  getUsersByName(@Param('name') name: string) {
    return this.userService.getByName(name);
  }

  @Get('/filter-by-email/:email')
  getUsersByEmail(@Param('email', EmailValidationPipe) email: string) {
    return this.userService.getByEmail(email);
  }

  @Put('bulk-update-status/:status')
  @ApiParam({
    name: 'status',
    enum: UserStatuses,
    description: descritionForStatuses(),
  })
  bulkUpdateStatus(
    @Param('status', StatusValidation) status: number,
    @Body() ids: string[],
  ) {
    return this.userService.bulkUpdateStatus(status, ids);
  }
}
