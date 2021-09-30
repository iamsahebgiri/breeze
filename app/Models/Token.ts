import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column()
  public type: string

  @column()
  public userId: number

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async addExpiresAt(token: Token) {
    if (token.type === 'RESET_PASSWORD') {
      token.expiresAt = DateTime.now().plus({ hours: 1 })
    }
  }

  public get isExpired() {
    /**
     * If expiresAt is null than it is a verify email token
     * and it never expires unless removed.
     */
    if (this.expiresAt === null) {
      return false
    }
    return this.expiresAt.diff(DateTime.local(), 'seconds').seconds <= 0
  }
}
