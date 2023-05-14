import Route from '@ioc:Adonis/Core/Route';

Route.get('/discord/redirect', 'DiscordController.redirect').as('auth.discord.redirect');

Route.get('/discord/callback', 'DiscordController.callback').as('auth.discord.callback');

Route.get('/discord/bot/redirect', 'DiscordController.botRedirect').as('bot.discord.redirect');

Route.get('/discord/bot/callback', 'DiscordController.botCallback').as('bot.discord.callback');
