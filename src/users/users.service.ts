import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPaginationResponse } from '../common/dto/response.with.pagonation.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { PaginationDTO } from '../common/dto/pagination.dto';
import { UserProvider } from './user.provider';
import { UserStatuses } from './enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userProvider: UserProvider,
  ) {}

  async getAll(
    params?: PaginationDTO,
  ): Promise<IPaginationResponse<UserResponseDto[]>> {
    return this.userProvider.findManyByFilter({}, params);
  }

  async getByName(name: string): Promise<UserResponseDto> {
    return this.userProvider.findOneByFilter({ name });
  }

  async getByEmail(email: string): Promise<UserResponseDto> {
    return this.userProvider.findOneByFilter({ email });
  }

  async bulkUpdateStatus(status: UserStatuses, ids: string[]) {
    if (!ids.length) {
      throw new Error();
    }
    const idsToUpdate = ids.map((el) => new Types.ObjectId(el));
    const m = await this.userProvider.bulkUpdate(
      { status },
      {
        _id: {
          $in: idsToUpdate,
        },
      },
    );
    return status;
  }
}
