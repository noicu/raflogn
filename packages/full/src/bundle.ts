import * as Core from "@raflogn/core";
import * as Engine from "@raflogn/engine";
import * as InterfaceTypes from "@raflogn/interface-types";
import * as RendererVue from "@raflogn/renderer-vue";

import { createApp, h } from "vue";
function createRaflogn(element: Element): RendererVue.IRaflognViewModel {
    let exportViewModel: RendererVue.IRaflognViewModel;

    createApp({
        setup() {
            const viewModel = RendererVue.useRaflogn();
            exportViewModel = viewModel;
            return { viewModel };
        },
        render() {
            return h(RendererVue.EditorComponent, { viewModel: this.viewModel });
        },
    }).mount(element);

    return exportViewModel!;
}

export { Core, Engine, InterfaceTypes, RendererVue, createRaflogn };
