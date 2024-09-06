import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  constructor(
    public statusCode: HttpStatus,  
    public message: string,  
    public data: T        
  ) {}
}