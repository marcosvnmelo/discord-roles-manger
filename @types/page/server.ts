import {
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPIGuildMembersResult,
  RESTGetAPIGuildResult,
} from 'discord-api-types/v10';
import { PageGlobalProps } from '.';

export interface ServersPageProps extends PageGlobalProps {
  guilds: RESTGetAPICurrentUserGuildsResult;
  guildsWithPermissions: Record<string, boolean>;
}

export interface ServerPageProps extends PageGlobalProps {
  guild: RESTGetAPIGuildResult;
  members: RESTGetAPIGuildMembersResult;
}
