import * as database from './database';
import { declare } from '..';

export interface DatabaseModule {
    database: typeof database;
}

export default declare({ database });