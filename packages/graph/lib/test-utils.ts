import TestUtils from '@node-redis/test-utils';
import RedisGraph from '.';

export default new TestUtils({
    dockerImageName: 'redislabs/redisgraph',
    dockerImageVersionArgument: 'redisgraph-version',
    defaultDockerVersion: '2.8.7'
});

export const GLOBAL = {
    SERVERS: {
        OPEN: {
            serverArguments: ['--loadmodule /usr/lib/redis/modules/redisgraph.so'],
            clientOptions: {
                graph: RedisGraph
            }
        }
    }
};
