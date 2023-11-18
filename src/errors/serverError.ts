import { ControllerError } from "./controllerError"

export class ServerError extends Error implements ControllerError {
    constructor (reason: string) {
      super('Server error: ' + reason + '.')
      this.name = 'ServerError'
      console.log(reason)
    }
  }