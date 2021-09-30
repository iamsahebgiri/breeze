/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors') || {}
  },
  notification: (ctx) => {
    return ctx.session.flashMessages.get('notification') || {}
  },
  auth: (ctx) => {
    return {
      user: ctx.auth.user
        ? {
            id: ctx.auth.user?.id,
            avatar: ctx.auth.user?.avatar,
            name: ctx.auth.user?.name,
            email: ctx.auth.user?.email,
          }
        : null,
    }
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
