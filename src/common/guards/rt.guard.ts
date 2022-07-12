import { AuthGuard } from '@nestjs/passport';

export class RTGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
