import { LogicalError } from '../common/custom-errors';

export class UserNotFoundError extends LogicalError {
  constructor() {
    super(10004, 'User such filter not found');
  }
}

export class StatusNotFoundError extends LogicalError {
  constructor() {
    super(10004, 'No such status');
  }
}
