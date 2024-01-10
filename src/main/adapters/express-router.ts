import { Controller } from '../presentation/contracts'

import { Request, Response, request, response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(request, response)
    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}