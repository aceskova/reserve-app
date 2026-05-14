export type RoleDto = "USER" | "TRAINER" | "ADMIN";

export type PublicUserDto = {
  id: string;
  email: string;
  name: string;
  role: RoleDto;
  createdAt: string;
  updatedAt: string;
};

export type RegisterResponseDto = {
  user: PublicUserDto;
};

export type MeResponseDto = {
  user: PublicUserDto;
};

export type LoginResponseDto = {
  accessToken: string;
  user: PublicUserDto;
};
