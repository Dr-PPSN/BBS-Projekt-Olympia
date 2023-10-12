import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { USERS } from './user.constant';

@Injectable()
export class UserService {

  async findeUserMitEmail(email: string): Promise<User | undefined> {
    return USERS.find(user => user.email === email);
  }
}
