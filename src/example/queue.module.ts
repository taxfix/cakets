import * as queue from './queue';
import { declare } from '..';


export interface QueueModule {
    queue: typeof queue;
}

export default declare({ queue });