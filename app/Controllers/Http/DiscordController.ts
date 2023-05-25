import Redis from '@ioc:Adonis/Addons/Redis';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class DiscordsController {
  public async redirect({ ally }: HttpContextContract) {
    return ally
      .use('discord')
      .redirect(request => request.scopes(['identify', 'guilds', 'guilds.members.read']));
  }

  public async callback({ ally, auth, response, request, session }: HttpContextContract) {
    try {
      let guildId = '';

      if (request.request.url) {
        guildId = /.+guild_id=(\d+).*/.exec(request.request.url)?.[1] || '';
      }

      const discordUser = await this.handleDiscordAlly(ally);

      const userByDiscordId = await User.findBy('discord_id', discordUser.id);

      if (!userByDiscordId && !auth.isAuthenticated) {
        throw new ValidationException(true, {
          errors: ['You need to register first'],
        });
      }

      if (userByDiscordId && !auth.isAuthenticated) {
        if ((userByDiscordId.discordTokenExpiresAt?.diffNow().toMillis() || 0) <= 0) {
          await userByDiscordId
            .merge({
              discordUsername: discordUser.nickName,
              discordToken: discordUser.token.token,
              discordRefreshToken: discordUser.token.refreshToken,
              discordTokenExpiresAt: discordUser.token.expiresAt,
            })
            .save();
        }

        await auth.login(userByDiscordId);

        response.redirect().toRoute('home');
      }

      if (!userByDiscordId && auth.isAuthenticated) {
        await auth
          .user!.merge({
            discordId: discordUser.id,
            discordUsername: discordUser.nickName,
            discordToken: discordUser.token.token,
            discordRefreshToken: discordUser.token.refreshToken,
            discordTokenExpiresAt: discordUser.token.expiresAt,
          })
          .save();

        response.redirect().toRoute('home');
      }

      if (guildId) {
        await auth
          .user!.merge({
            discordId: discordUser.id,
            discordUsername: discordUser.nickName,
            discordToken: discordUser.token.token,
            discordRefreshToken: discordUser.token.refreshToken,
            discordTokenExpiresAt: discordUser.token.expiresAt,
          })
          .save();

        await Redis.set(`guild:${guildId}:user:${auth.user!.id}`, 'true');

        session.flash('success', ['Successfully added to server']);

        return response.redirect(`/servers/${guildId}`);
      }

      session.flash('success', ['Successfully logged in']);

      response.redirect().toRoute('home');
    } catch (error) {
      response.redirect('/login');
    }
  }

  public botRedirect({ ally }: HttpContextContract) {
    return ally
      .use('discord')
      .stateless()
      .redirect(request =>
        request
          .scopes(['identify', 'guilds', 'guilds.members.read', 'bot'])
          .param('permissions', '268435504')
      );
  }

  private handleDiscordAlly(ally: HttpContextContract['ally']) {
    const discord = ally.use('discord');

    if (discord.accessDenied()) {
      throw new ValidationException(true, {
        errors: ['Access was denied'],
      });
    }

    if (discord.stateMisMatch()) {
      throw new ValidationException(true, {
        errors: ['Request expired. Retry again'],
      });
    }

    if (discord.hasError()) {
      throw new ValidationException(true, {
        errors: [discord.getError()],
      });
    }

    return discord.user();
  }
}
