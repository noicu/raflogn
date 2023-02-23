import { Ref, toRef } from "vue";
import { Graph } from "@raflogn/core";
import { useViewModel } from "./useViewModel";
import { SwitchGraph } from "../graph/switchGraph";

export function useGraph(): { graph: Readonly<Ref<Graph>>; switchGraph: SwitchGraph } {
    const { viewModel } = useViewModel();
    return {
        graph: toRef(viewModel.value, "displayedGraph"),
        switchGraph: viewModel.value.switchGraph,
    };
}
