
import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Package} from '../../models/cart/package';
export default class PackageController extends ApiController<Package> {
    constructor(db: Connection) {
        super(db, 'package', Package);
    }


}
