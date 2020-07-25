import { DoneRoute } from '@models/DoneRoute'
import { RouteRequirement } from '@models/RouteRequirement'

class RouteRequirementsUtils {
  async verify (route_requirements: RouteRequirement[], user_id: number): Promise<boolean> {
    let locked = false
    for (let i = 0; i < route_requirements.length; i++) {
      const isLocked = await this.isLocked(route_requirements[i], user_id)
      if (isLocked) {
        locked = true
        break
      }
    }

    return locked
  }

  async isDone (route: RouteRequirement, user_id: number): Promise<boolean> {
    const n = await DoneRoute.count({ where: { user_id, route_id: route.required_route_id } })
    return n !== 0
  }

  async isLocked (required_route: RouteRequirement, user_id: number): Promise<boolean> {
    const isDone = await this.isDone(required_route, user_id)
    return !isDone
  }
}

export default new RouteRequirementsUtils()
