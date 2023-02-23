// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NodeInterface } from "@raflogn/core/dist/nodeInterface";

declare module "@raflogn/core/dist/nodeInterface" {
    interface NodeInterface {
        allowMultipleConnections?: boolean;
    }
}
