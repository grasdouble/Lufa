import { Stack as StackCore } from './Stack';
import { StackItem } from './StackItem';

export const Stack = Object.assign(StackCore, {
    Item: StackItem,
});

export * from './Stack.constants';

export type { StackProps } from './Stack';
export type { StackItemProps } from './StackItem';
