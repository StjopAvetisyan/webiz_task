import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user.response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { PaginationDTO } from '../common/dto/pagination.dto';
import { UserNotFoundError } from './user.errors';

@Injectable()
export class UserProvider {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findManyByFilter(filter?: any, params?: PaginationDTO) {
    const skip = params.skip ?? 0;
    const limit = params.limit ?? 10;
    const users = await this.userModel
      .find(filter ?? {}, null, { limit, skip })
      .exec();
    return {
      data: users,
      pagination: {
        skip,
        limit,
      },
    };
  }

  async findOneByFilter(filter: any): Promise<UserResponseDto> {
    const user = await this.userModel.findOne(filter).exec();
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async bulkUpdate(setParams: any, filter: any) {
    return this.userModel.updateMany(filter, {
      $set: setParams,
    });
  }
}
