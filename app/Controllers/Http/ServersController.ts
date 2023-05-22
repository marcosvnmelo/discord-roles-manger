import Redis from '@ioc:Adonis/Addons/Redis';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import api from '@ioc:Lib/Discord';

export default class ServersController {
  public async index({ auth, inertia }: HttpContextContract) {
    try {
      const userDiscordToken = auth.user?.discordToken;

      if (!userDiscordToken) {
        throw new ValidationException(true, {
          errors: ['Missing discord token'],
        });
      }

      const guilds = await api.listUserGuilds(userDiscordToken);

      const guildsWithPermissionsList = await Promise.all(
        guilds.map(async guild => {
          const hasAccess = await Redis.get(`guild:${guild.id}:user:${auth.user!.id}`);

          return {
            [guild.id]: hasAccess === 'true',
          };
        })
      );

      const guildsWithPermissions = guildsWithPermissionsList.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );

      return inertia.render('Servers', {
        guilds,
        guildsWithPermissions,
      });
    } catch (error) {
      throw new ValidationException(true, {
        errors: ['Error while fetching servers', error.message],
      });
    }
  }

  // public async create({}: HttpContextContract) {}

  // public async store({}: HttpContextContract) {}

  public async show({ request, inertia }: HttpContextContract) {
    try {
      const { id } = request.params();

      if (!id) {
        throw new ValidationException(true, {
          errors: ['Missing server id'],
        });
      }

      const guild = await api.getGuild(id);

      const members = await api.getGuildMembers(id);

      return inertia.render('Server', {
        guild,
        members,
      });
    } catch (error) {
      throw new ValidationException(true, {
        errors: ['Error while fetching server', error.message],
      });
    }
  }

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
