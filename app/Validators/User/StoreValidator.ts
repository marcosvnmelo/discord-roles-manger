import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string(
      {
        trim: true,
      },
      [rules.email(), rules.unique({ table: 'users', column: 'email' })]
    ),
    password: schema.string({}, [rules.confirmed('password_confirmation')]),
  });

  public messages: CustomMessages = {
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'O campo email já está em uso',
    'password.required': 'O campo senha é obrigatório',
    'password.confirmed': 'O campo confirmação de senha não confere',
  };
}
