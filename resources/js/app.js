import '../css/app.css'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
// import { initRoutes, stardust } from '@eidellev/adonis-stardust'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Adonis Breeze'

// initRoutes()
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    return render(<App {...props} />, el)
  },
})

// console.log(stardust)

InertiaProgress.init({ color: '#4B5563' })
