import { PaginationDTO } from './pagination.dto';

export class IPaginationResponse<T> {
  data: T;
  pagination: PaginationDTO;
}
