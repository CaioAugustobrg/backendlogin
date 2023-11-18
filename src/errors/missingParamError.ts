import { ControllerError } from "./controllerError"

export class MissingParamError extends Error implements ControllerError {
    constructor (paramName: string) {
      super('Missing param: ' + paramName)
      this.name = 'MissingParamError'
    }
  }