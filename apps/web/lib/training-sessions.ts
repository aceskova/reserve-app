import "server-only";

import type {
  ListTrainingSessionsResponseDto,
  TrainingSessionDto,
} from "@repo/api-contracts";
import { getApiUrl } from "./env";

export async function getTrainingSessions(): Promise<TrainingSessionDto[]> {
  const response = await fetch(`${getApiUrl()}/v1/training-sessions`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const result = (await response.json()) as ListTrainingSessionsResponseDto;

  return result.trainingSessions;
}
