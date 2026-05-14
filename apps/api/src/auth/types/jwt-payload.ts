import { Role } from '@repo/db';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};

export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};
