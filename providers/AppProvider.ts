import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { RouterContract } from '@ioc:Adonis/Core/Route'
import { ViewContract } from '@ioc:Adonis/Core/View'

export default class AppProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  /**
   * Returns list of named routes
   */
  private getNamedRoutes(Route: RouterContract) {
    /**
     * Only sharing the main domain routes. Subdomains are
     * ignored for now. Let's see if many people need it
     */
    const mainDomainRoutes = Route.toJSON()?.['root'] ?? []

    return mainDomainRoutes.reduce<Record<string, any>>((routes, route) => {
      if (route.name) {
        routes[route.name] = {
          methods: route.methods,
          pattern: route.pattern,
        }
      }

      return routes
    }, {})
  }

  /**
   * Register the `@zeus()` tag
   */
  private registerStardustTag(View: ViewContract) {
    View.registerTag({
      block: false,
      tagName: 'zeus',
      seekable: false,
      compile(_, buffer, token) {
        buffer.writeExpression(
          `\n
          out += template.sharedState.zeus()
          `,
          token.filename,
          token.loc.start.line
        )
      },
    })
  }

  private registerRoutesGlobal(View: ViewContract, namedRoutes: Record<string, string>) {
    View.global('zeus', () => {
      return `
<script>
  window.zeus = {namedRoutes: ${JSON.stringify(namedRoutes)}};
</script>
      `
    })
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    this.app.container.withBindings(['Adonis/Core/View', 'Adonis/Core/Route'], (View, Route) => {
      const namedRoutes = this.getNamedRoutes(Route)
      this.registerRoutesGlobal(View, namedRoutes)
      this.registerStardustTag(View)
    })
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
