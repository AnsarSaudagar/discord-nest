export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  password_hash?: string;
  gender?: string;
  birthday?: string;
  provider?: string;
  profile_picture?: string;
}
