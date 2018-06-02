import { inject } from '..';
import { DatabaseModule } from './database.module';
import { QueueModule } from './queue.module';

export default inject(({database, queue}: DatabaseModule & QueueModule) => ({
    myFunction: (a: number) => queue.send(database.get(a.toString(2)))
}));