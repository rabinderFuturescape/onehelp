import { UserResponseDto } from './UserDto';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}
