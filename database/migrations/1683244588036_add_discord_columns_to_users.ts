import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, table => {
      table.text('discord_id').nullable();
      table.text('discord_username').nullable();
      table.text('discord_token').nullable();
      table.text('discord_refresh_token').nullable();
      table.timestamp('discord_token_expires_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('discord_id');
      table.dropColumn('discord_username');
      table.dropColumn('discord_token');
      table.dropColumn('discord_refresh_token');
      table.dropColumn('discord_token_expires_at');
    });
  }
}
