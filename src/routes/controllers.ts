import { UsersController } from './users/controller'
import { LessonsController } from './lessons/lessons.controller'
import { AuthController } from './auth/controller'
import { RoutesController } from './routes/routes.controller'
import { StepsController } from './steps/steps.controller'




const Controllers: any[] = [
    UsersController,
    LessonsController,
    AuthController,
    RoutesController,
    StepsController
]
export default Controllers