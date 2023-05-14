import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async index({ response, inertia, auth }: HttpContextContract) {
    if (auth.use('web').isLoggedIn) {
      return response.redirect().toRoute('home');
    }

    return inertia.render('Login');
  }

  public async create({ inertia }: HttpContextContract) {
    return inertia.render('SignUp');
  }

  public async store({ request, inertia, auth, session }: HttpContextContract) {
    try {
      const data = request.only(['email', 'password']);

      await auth.use('web').attempt(data.email, data.password);

      return inertia.location('/home');
    } catch (error) {
      session.flash('errors', ['Credenciais inválidas']);
      return inertia.redirectBack();
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
