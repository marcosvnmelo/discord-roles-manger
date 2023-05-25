import Route from '@ioc:Adonis/Core/Route';

Route.patch('/members/:id', 'MembersController.updateMember')
  .as('members.patch')
  .middleware('auth');
