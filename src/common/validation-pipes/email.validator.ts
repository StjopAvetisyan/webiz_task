import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EmailNotValidError } from '../custom-errors/validation.errors';

@Injectable()
export class EmailValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    const exp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (exp.test(value)) {
      return value;
    }

    throw new EmailNotValidError();
  }
}
