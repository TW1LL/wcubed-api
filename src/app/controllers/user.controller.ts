import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {User} from '../models/account/user';
export class UserController extends ApiController<User> {
    constructor(db: Connection) {
        super(db, 'user', User);
    }
}
