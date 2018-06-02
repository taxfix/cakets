# CakeTS

Inspired by [Scala's Cake Pattern](http://jonasboner.com/real-world-scala-dependency-injection-di/), `CakeTS` is an attempt to
provide a minimalistic, and consistent dependency injection pattern for the TypeScript world.

## How?

So let's say you want to write a file module that needs some external dependencies, this is how 
you do it:

```typescript
import { inject } from 'cakets';
import { DatabaseModule } from './database.module';
import { QueueModule } from './queue.module';

export default inject(({database, queue}: DatabaseModule & QueueModule) => ({
    myFunction: (a: number) => queue.send(database.get(a.toString(2)))
}));
```

**What about those `DatabaseModule` and `QueueModule`?**

Nothing fancy, there are just typed depencies:

```typescript
// database.module.ts
import * as database from './database';
import { declare } from 'cakets';

export interface DatabaseModule {
    database: typeof database;
}

export default declare({ database });
```

`declare` is just syntax sugar for modules which do not have any dependencies:

```typescript
// the following is equivalent to: declare({ database })
inject((nothing: {}) => ({ database }));
```

**Now compose all your modules to create your Application**

```typescript
import DatabaseModule from './database.module';
import QueueModule from './queue.module';
import Example1 from './example1';
import Example2 from './example2';


const app = Example2(Example1(QueueModule(DatabaseModule())))();

app.myFunction(10);
app.myFunction2('hello');
```

**What about testing?**

Easy peasy, just inject your mocked modules:

```typescript
import { declare } from 'cakets';

const mockQueue = ({
    send: jest.fn()
});

const TestQueueModule declare({ queue: mockQueue });

import Example2 from './example2';

const test = Example2(TestQueueModule())();

describe('Example2', () => {
    it('send stuff on the queue', () => {
        test.myFunction2('this is a test');
        expect(mockQueue.send).toHaveBeenCalledWith('this is a test');
    })
})
```

