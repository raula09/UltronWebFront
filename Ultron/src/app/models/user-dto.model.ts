export interface UserDto {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  roles?: string[];
}