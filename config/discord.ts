import Env from '@ioc:Adonis/Core/Env';

export interface DiscordConfig {
  token: string;
}

const config: DiscordConfig = {
  token: Env.get('DISCORD_BOT_TOKEN'),
};

export default config;
