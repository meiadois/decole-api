import { UsersService } from './users/service'
import { LessonsService }from './lessons/lessons.service'
import { RoutesService }from './routes/routes.service'
import { StepsService }from './steps/steps.service'



import { Provider } from '@nestjs/common'

const Services: Provider[] = [
    UsersService,
    LessonsService,
    RoutesService,
    StepsService
]
export default Services