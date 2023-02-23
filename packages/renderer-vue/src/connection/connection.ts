import { NodeInterface } from "@raflogn/core";

export enum TemporaryConnectionState {
    NONE,
    ALLOWED,
    FORBIDDEN,
}

export interface ITemporaryConnection {
    status: TemporaryConnectionState;
    from: NodeInterface;
    to?: NodeInterface;
    mx?: number;
    my?: number;
}
