import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserStatuses } from '../enums';
import { StatusNotFoundError } from '../user.errors';

@Injectable()
export class StatusValidation implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value in UserStatuses) return Number(value);
    else throw new StatusNotFoundError();
  }
}
