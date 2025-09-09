import { UserDto } from './user-dto.model';

export interface LoginResponse {
  message: string;
  token: string; 
  user: UserDto;
}

export interface VerifyResponse {
  message: string;
  token: string; 
  user: UserDto;
}