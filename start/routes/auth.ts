import Route from '@ioc:Adonis/Core/Route';

Route.get('/login', 'AuthController.index');

Route.post('/login', 'AuthController.store');

Route.get('/sign-up', 'AuthController.create');
