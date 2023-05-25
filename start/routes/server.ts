import Route from '@ioc:Adonis/Core/Route';

Route.get('/servers', 'ServersController.index')
  .as('servers.index')
  .middleware('auth');

Route.get('/servers/:id', 'ServersController.show')
  .as('servers.show')
  .middleware('auth');
