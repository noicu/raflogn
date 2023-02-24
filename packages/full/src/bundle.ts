import * as Core from "@raflogn/core";
import * as Engine from "@raflogn/engine";
import * as InterfaceTypes from "@raflogn/interface-types";
import * as RendererVue from "@raflogn/renderer-vue";

import "@raflogn/renderer-vue/dist/styles.css";

import { createApp, h } from "vue";
function createRaflogn(element: Element): RendererVue.IRaflognViewModel {
    let exportViewModel: RendererVue.IRaflognViewModel;

    createApp({
        components: {
            "raflogn-editor": RendererVue.EditorComponent,
        },
        setup() {
            const { viewModel } = RendererVue.useViewModel();
            exportViewModel = viewModel.value;
            return { viewModel };
        },
        render() {
            return h("raflogn-editor", {
                props: {
                    viewModel: this.viewModel,
                },
            });
        },
    }).mount(element);

    return exportViewModel;
}

export { Core, Engine, InterfaceTypes, RendererVue, createRaflogn };
