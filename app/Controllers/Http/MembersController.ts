import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, ValidationException } from '@ioc:Adonis/Core/Validator';
import api from '@ioc:Lib/Discord';

export default class MembersController {
  public async updateMember({ request, inertia }: HttpContextContract) {
    try {
      const { guildId, rolesToAdd, rolesToRemove } = await request.validate({
        schema: schema.create({
          rolesToAdd: schema.array().members(schema.string()),
          rolesToRemove: schema.array().members(schema.string()),
          guildId: schema.string(),
        }),
      });

      const memberId = request.param('id');

      await Promise.all([
        ...rolesToAdd.map(roleId =>
          api.addRoleToMember(guildId, memberId, roleId)
        ),
        ...rolesToRemove.map(roleId =>
          api.removeRoleFromMember(guildId, memberId, roleId)
        ),
      ]);

      inertia.location(`/servers/${guildId}`);
    } catch (error) {
      console.log(error);

      inertia.redirectBack();

      throw new ValidationException(true, {
        errors: ['Error while updating member', error.message],
      });
    }
  }
}
