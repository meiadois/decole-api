import { Request, Response } from 'express'
import db from '../models/index'

class A {
    public a = ''
    public constructor () {
      this.a = 'a'
    }
}
class StepsController {
  public async list (req: Request, res: Response): Promise<Response> {
    const steps = await db.Step.findAll()
    return res.json(steps)
  }

  public async index (req: Request, res: Response): Promise<Response> {
    const segments = await db.Segment.findAll()
    return res.json(segments)
  }
}
export default new StepsController()
