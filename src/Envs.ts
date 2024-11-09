import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const AUTH_SERVICE_URL =
  publicRuntimeConfig.AUTH_SERVICE_URL ?? 'https://predigrowee.agh.edu.pl/api/auth';
export const QUIZ_SERVICE_URL =
  publicRuntimeConfig.QUIZ_SERVICE_URL ?? 'https://predigrowee.agh.edu.pl/api/quiz';
export const STATS_SERVICE_URL =
  publicRuntimeConfig.STATS_SERVICE_URL ?? 'https://predigrowee.agh.edu.pl/api/stats';
