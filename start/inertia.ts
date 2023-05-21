/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia';

Inertia.share({
  user: ctx => ctx.auth.user,
  errors: ctx => ctx.session.flashMessages.get('errors'),
  success: ctx => ctx.session.flashMessages.get('success'),
  infos: ctx => ctx.session.flashMessages.get('infos'),
}).version(() => Inertia.manifestFile('public/manifest.json'));
