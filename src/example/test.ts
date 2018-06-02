import TestQueueModule from './queue.test-module';
import Example2 from './example2';

const test = Example2(TestQueueModule())();

test.myFunction2('this is a test');