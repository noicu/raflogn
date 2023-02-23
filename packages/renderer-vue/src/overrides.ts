// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractNode } from "@raflogn/core/dist/node";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NodeInterface } from "@raflogn/core/dist/nodeInterface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Graph } from "@raflogn/core/dist/graph";

declare module "@raflogn/core/dist/node" {
    interface AbstractNode {
        position: { x: number; y: number };
        width: number;
        disablePointerEvents: boolean;
        twoColumn: boolean;
    }
}

declare module "@raflogn/core/dist/nodeInterface" {
    interface NodeInterface {
        displayInSidebar?: boolean;
    }
}

declare module "@raflogn/core/dist/graph" {
    interface Graph {
        panning: { x: number; y: number };
        scaling: number;
        sidebar: { visible: boolean; nodeId: string; optionName: string };
        selectedNodes: AbstractNode[];
    }
}

declare module "@raflogn/core/dist/graphTemplate" {
    interface GraphTemplate {
        panning?: { x: number; y: number };
        scaling?: number;
    }

    interface IGraphTemplateState {
        panning?: { x: number; y: number };
        scaling?: number;
    }
}
