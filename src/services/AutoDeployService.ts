import { Request, Response } from 'express'
import NodeMailer from './NodeMailer'
import * as crypto from 'crypto'
// import { exec } from 'child_process'
require('dotenv/config')
class AutoDeployService {
  async deploy (req: Request, res: Response): Promise<Response | void> {
    const payload = JSON.stringify(req.body)
    if (!payload) {
      return res.status(400).json({})
    }

    const sig = req.get('X-Hub-Signature') || ''
    const hmac = crypto.createHmac('sha1', String(process.env.GITHUB_X_HUB_SIGNATURE))
    const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8')
    const checksum = Buffer.from(sig, 'utf8')
    if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
      const message = `Request body digest (${digest}) did not match ${'X-Hub-Signature'} (${checksum})`
      await NodeMailer.sendMail('guiscunha@gmail.com', 'Deploy Error', message)
      return res.status(400).json({})
    }
    /*
    if (signature !== String(process.env.GITHUB_X_HUB_SIGNATURE)) {
      await NodeMailer.sendMail('guiscunha@gmail.com', 'Deploy Error', `Assinatura [${signature}] inválida`)
      return res.status(400).json({})
    } */

    await NodeMailer.sendMail('guiscunha@gmail.com', 'Deploy Sucess', 'Assinatura válidada')
    return res.status(200).json({})
  }
}
export default new AutoDeployService()
