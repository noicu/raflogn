import * as Core from "@raflogn/core";
import * as Engine from "@raflogn/engine";
import * as InterfaceTypes from "@raflogn/interface-types";
import * as RendererVue from "@raflogn/renderer-vue";

import "@raflogn/renderer-vue/dist/styles.css";

import { createApp, h } from "vue";
function createBaklava(element: Element): RendererVue.IBaklavaViewModel {
    let exportViewModel: RendererVue.IBaklavaViewModel;

    createApp({
        components: {
            "baklava-editor": RendererVue.EditorComponent,
        },
        setup() {
            const { viewModel } = RendererVue.useViewModel();
            exportViewModel = viewModel.value;
            return { viewModel };
        },
        render() {
            return h("baklava-editor", {
                props: {
                    viewModel: this.viewModel,
                },
            });
        },
    }).mount(element);

    return exportViewModel;
}

export { Core, Engine, InterfaceTypes, RendererVue, createBaklava };
