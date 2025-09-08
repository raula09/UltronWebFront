import { UserDto } from './user-dto.model';

export interface LoginResponse {
  message: string;
  token: string; // e.g. "Bearer eyJ..."
  user: UserDto;
}

export interface VerifyResponse {
  message: string;
  token: string; // "Bearer ..."
  user: UserDto;
}