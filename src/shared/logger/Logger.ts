import { Logger as NestLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {
  log(message: string): void {
    super.log(message)
  }
  error(message: string, trace: string): void {
    super.error(message, trace)

  }
  warn(message: string): void {
    super.warn(message)
  }
  debug(message: string): void {
    super.debug(message)

  }
  verbose(message: string): void {
    super.verbose(message)
  }
}