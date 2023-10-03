import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiPropertyOptional()
  limit: number;
  @ApiPropertyOptional()
  skip: number;
}
