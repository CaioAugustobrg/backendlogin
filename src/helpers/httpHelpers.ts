import { HttpResponse } from '../ports/http'
import { ServerError } from '../errors/serverError'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message
})