import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tokens extends BaseSchema {
  protected tableName = 'tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token').notNullable()
      table.enum('type', ['VERIFY_EMAIL', 'RESET_PASSWORD']).notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('expires_at', { useTz: true }).nullable()

      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
