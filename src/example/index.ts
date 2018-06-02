import DatabaseModule from './database.module';
import QueueModule from './queue.module';
import Example1 from './example1';
import Example2 from './example2';


const app = Example2(Example1(QueueModule(DatabaseModule())))();

app.myFunction(10);
app.myFunction2('hello');