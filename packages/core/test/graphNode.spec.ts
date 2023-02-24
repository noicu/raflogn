import { createGraphNodeType, Editor, Graph, GraphTemplate, INodeState } from "../src";
import OutputNode from "./OutputNode";
import TestNode from "./TestNode";

describe("Graph Node", () => {
    function getTemplate(): { editor: Editor; template: GraphTemplate; graph: Graph } {
        const editor = new Editor();
        editor.registerNodeType(OutputNode);
        editor.registerNodeType(TestNode);

        const graph = new Graph(editor);
        const n1 = graph.addNode(new TestNode())!;
        const n2 = graph.addNode(new OutputNode())!;
        graph.addConnection(n1.outputs.b, n2.inputs.input);

        const template = new GraphTemplate(graph.save(), editor);
        return { template, editor, graph };
    }

    it("sets the name of the template when changing title", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        n.title = "Test";
        expect(template.name).toBe("Test");
    });

    it("updates its title when the template name changes", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        template.name = "Test";
        expect(n.title).toBe("Test");
    });

    it("updates its interfaces when the template changes", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        expect(Object.keys(n.inputs)).toHaveLength(0);
        expect(Object.keys(n.outputs)).toHaveLength(1);
        template.update({
            ...template.save(),
            inputs: [
                {
                    id: "abc",
                    name: "Test",
                    nodeInterfaceId: (template.nodes[0] as INodeState<TestNode["inputs"], TestNode["outputs"]>).inputs.a
                        .id,
                },
            ],
        });
        expect(Object.keys(n.inputs)).toHaveLength(1);
        expect(Object.keys(n.outputs)).toHaveLength(1);
    });

    it("calls the destroy method of the internal graph when destroying the node", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        const spy = jest.fn();
        n.subgraph!.destroy = spy;
        n.onDestroy();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("includes a graph state when saving", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        const savedState = n.save();
        expect(savedState).toHaveProperty("graphState");
    });

    it("loads correctly", () => {
        const { template } = getTemplate();
        const GraphNode = createGraphNodeType(template);
        const n = new GraphNode();
        n.onPlaced();
        (n.subgraph!.nodes[0] as TestNode).inputs.a.value = 22;
        const savedState = n.save();
        const n2 = new GraphNode();
        n2.onPlaced();
        n2.load(savedState);
        expect((n2.subgraph!.nodes[0] as TestNode).inputs.a.value).toBe(22);
    });

    it("keeps connections when updating its interfaces", () => {
        const { template, editor } = getTemplate();
        template.inputs.push({
            id: "abc",
            name: "Test",
            nodeInterfaceId: (template.nodes[0] as INodeState<TestNode["inputs"], TestNode["outputs"]>).inputs.a.id,
        });
        template.outputs.push({
            id: "def",
            name: "Output",
            nodeInterfaceId: (template.nodes[0] as INodeState<TestNode["inputs"], TestNode["outputs"]>).outputs.b.id,
        });

        const GraphNode = createGraphNodeType(template);
        const gn = editor.graph.addNode(new GraphNode())!;
        const n1 = editor.graph.addNode(new TestNode())!;
        const n2 = editor.graph.addNode(new TestNode())!;

        editor.graph.addConnection(n1.outputs.b, Object.values(gn.inputs)[0]);
        editor.graph.addConnection(Object.values(gn.outputs)[0], n2.inputs.a);
        expect(editor.graph.connections).toHaveLength(2);

        template.update(gn.subgraph!.save());
        expect(editor.graph.connections).toHaveLength(2);
    });
});
