import { inject } from '..';
import { QueueModule } from './queue.module';

export default inject(({ queue }: QueueModule ) => ({
    myFunction2: (a: string) => queue.send(a)
}));