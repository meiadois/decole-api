import { Request, Response } from 'express'

class A {
    public a = ''
    public constructor () {
      this.a = 'a'
    }
}
class StepsController {
  public async list (req: Request, res: Response): Promise<Response> {
    const objects: Array<A> = [new A(), new A()]
    return res.json(objects)
  }

  public async index (req: Request, res: Response): Promise<A> {
    return new A()
  }
}
export default new StepsController()
