import { AbstractNode, Editor } from "@raflogn/core";
import { CalculationResult } from "./baseEngine";

/**
 * 将计算结果值应用到图中的输出接口
 * @param result 计算结果
 * @param editor 编辑器实例
 */
export function applyResult(result: CalculationResult, editor: Editor): void {
    const nodeMap: Map<string, AbstractNode> = new Map();

    // 将所有节点映射到其 id
    editor.graphs.forEach((g) => {
        g.nodes.forEach((n) => nodeMap.set(n.id, n));
    });

    // 遍历结果
    result.forEach((intfValues, nodeId) => {
        // 根据节点 id 获取节点
        const node = nodeMap.get(nodeId);

        // 如果节点不存在，则跳过
        if (!node) {
            return;
        }

        // 结果中的输出接口
        intfValues.forEach((value, intfKey) => {
            // 根据结果中的接口名称获取节点的输出接口
            const intf = node.outputs[intfKey];

            // 如果接口不存在，则跳过
            if (!intf) {
                return;
            }

            // 将结果值应用到接口
            intf.value = value;
        });
    });
}
