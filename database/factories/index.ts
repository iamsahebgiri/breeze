import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  faker.setLocale('en_IND')
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    password: 'Pa$$w0rd!',
  }
}).build()
