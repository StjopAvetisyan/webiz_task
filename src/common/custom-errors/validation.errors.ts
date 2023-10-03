import { LogicalError } from './index';

export class EmailNotValidError extends LogicalError {
  constructor() {
    super(50005, 'Email format not valid');
  }
}
