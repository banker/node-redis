# v3 to v4 Migration Guide

Version 4 of Node Redis is a major refactor. While we have tried to maintain backwards compatibility where possible, several interfaces have changed. Read this guide to understand the differences and how to implement version 4 in your application.

## All of the Breaking Changes

See the [Change Log](../packages/client/CHANGELOG.md).

### Promises

Node Redis now uses native [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) by default for all functions.

### `createClient`

The configuration object passed to `createClient` has changed significantly with this release. See the [client configuration guide](./client-configuration.md) for details.

### No Auto Connect

In V4, the client does not automatically connect to the server, you need to run `.connect()` before any command, or you will receive error `ClientClosedError: The client is closed`.

```typescript
import { createClient } from 'redis';

const client = createClient();

await client.connect();

await client.ping();
```

### No `message` event

In V4, you don't need to add listener to the `message` and `message_buffer` events, you can get the message directly in `subscribe`-like commands.

The second argument of these commands is a callback, which will be triggered every time there is a message published to the channel.

The third argument to these commands is a boolean to set `bufferMode` (default `false`).  If it's set to `true` you will receive a buffer instead of a string.

The `subscribe`-like commands return a promise. If the server returns `ok` the promise will be fulfilled, otherwise the promise will be rejected.

```typescript
import { createClient } from 'redis';

const subscriber = createClient();

await subscriber.connect();

await subscriber.subscribe('channel_name', (message, channelName) => {
    console.info(message, channelName);
});
```

## Legacy Mode

Use legacy mode to preserve the backwards compatibility of commands while still getting access to the updated experience:

```typescript
const client = createClient({
    legacyMode: true
});

// legacy mode
client.set('key', 'value', 'NX', (err, reply) => {
    // ...
});

// version 4 interface is still accessible
await client.v4.set('key', 'value', {
    NX: true
});
```
