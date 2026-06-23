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

export type TrainingSessionDto = {
  id: string;
  title: string;
  description: string | null;
  trainer: {
    id: string;
    name: string;
  };
  startsAtUtc: string;
  endsAtUtc: string;
  capacity: number;
  priceCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTrainingSessionRequestDto = {
  title: string;
  description?: string;
  startsAtUtc: string;
  endsAtUtc: string;
  capacity: number;
  priceCents: number;
  currency: string;
};

export type ListTrainingSessionsResponseDto = {
  trainingSessions: TrainingSessionDto[];
};

export type CreateTrainingSessionResponseDto = {
  trainingSession: TrainingSessionDto;
};
