import { PageProps } from '@inertiajs/core';

export interface PageGlobalProps extends PageProps {
  user:
    | {
        id: number;
        email: string;
        discord_id: string | null;
        discord_username: string | null;
      }
    | undefined;
}

export * from './server';
