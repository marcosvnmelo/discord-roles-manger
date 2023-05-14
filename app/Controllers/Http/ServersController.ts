import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import api from '@ioc:Lib/Discord';

export default class ServersController {
  public async index({ auth, inertia, session }: HttpContextContract) {
    try {
      const userDiscordToken = auth.user?.discordToken;

      if (!userDiscordToken) {
        throw new Error('Missing discord token');
      }

      const guilds = await api.listUserGuilds(userDiscordToken);

      return inertia.render('Servers', {
        guilds,
      });
    } catch (error) {
      session.flash('errors', ['Error while fetching servers']);

      return inertia.redirectBack();
    }
  }

  // public async create({}: HttpContextContract) {}

  // public async store({}: HttpContextContract) {}

  public async show({ request, inertia, session }: HttpContextContract) {
    try {
      const { id } = request.params();

      if (!id) {
        throw new Error('Missing server id');
      }

      const guild = await api.getGuild(id);

      const members = await api.getGuildMembers(id);

      return inertia.render('Server', {
        guild,
        members,
      });
    } catch (error) {
      session.flash('errors', ['Error while fetching server']);

      console.log('error', error);

      return inertia.redirectBack();
    }
  }

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
