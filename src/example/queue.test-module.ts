import { declare } from '../';

const mockQueue = ({
    send: (a: string) => {
        console.log(`MOCK queue: ${a}`);
    }
});

export default declare({ queue: mockQueue });