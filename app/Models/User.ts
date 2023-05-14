import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { compose } from '@ioc:Adonis/Core/Helpers';
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public discordId: string | null;

  @column()
  public discordUsername: string | null;

  @column()
  public discordToken: string | null;

  @column()
  public discordRefreshToken: string | null;

  @column.dateTime()
  public discordTokenExpiresAt: DateTime | null;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
