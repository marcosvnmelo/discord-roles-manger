import { PageProps } from '@inertiajs/core';

type Message = {
  [key: string]: string;
};

export interface PageGlobalProps extends PageProps {
  user:
    | {
        id: number;
        email: string;
        discord_id: string | null;
        discord_username: string | null;
      }
    | undefined;
  success?:
    | (Message & {
        [key: string]: Message;
      })
    | string[];
  infos?:
    | (Message & {
        [key: string]: Message;
      })
    | string[];
}

export * from './server';
