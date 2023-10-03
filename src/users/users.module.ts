import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { AppService } from '../app.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UserProvider } from './user.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [AppService, UsersService, UserProvider],
})
export class UsersModule {}
