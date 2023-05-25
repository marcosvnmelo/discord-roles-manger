import { API } from '@discordjs/core';
import { REST } from '@discordjs/rest';
import { Axios } from 'axios';
import { RESTGetAPICurrentUserGuildsResult, Routes } from 'discord-api-types/v10';

export default class Discord {
  protected api: API;

  constructor(token: string) {
    const rest = new REST({ version: '10' }).setToken(token);

    this.api = new API(rest);
  }

  public listUserGuilds(userToken: string) {
    return this.manualApiGet<RESTGetAPICurrentUserGuildsResult>(userToken, Routes.userGuilds());
  }

  public getGuild(id: string) {
    return this.api.guilds.get(id);
  }

  public getGuildMembers(id: string) {
    return this.api.guilds.getMembers(id, {
      after: undefined,
      limit: 1000,
    });
  }

  public addRoleToMember(guildId: string, memberId: string, roleId: string) {
    return this.api.guilds.addRoleToMember(guildId, memberId, roleId);
  }

  public removeRoleFromMember(guildId: string, memberId: string, roleId: string) {
    return this.api.guilds.removeRoleFromMember(guildId, memberId, roleId);
  }

  private async manualApiGet<T>(token: string, url: string): Promise<T> {
    const axios = new Axios({
      baseURL: 'https://discord.com/api/v10',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await axios.get<string>(url);

    const data = JSON.parse(response.data);

    if (data.message === '401: Unauthorized') {
      throw new Error('Unauthorized');
    }

    return data;
  }
}
