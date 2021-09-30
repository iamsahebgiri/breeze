import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await User.create({
      name: 'Admin User',
      password: 'Pa$$w0rd!',
      avatar: 'https://cdn.fakercloud.com/avatars/antjanus_128.jpg',
      email: 'admin@admin.com',
    })
    await UserFactory.createMany(10)
  }
}
