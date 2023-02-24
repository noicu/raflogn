# Browser Build

While not recommended, it is possible to use RaflognJS standalone; without Vue and any build tools.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@raflogn/themes@2.0.2-beta.3/dist/syrup-dark.css" />
        <style>
            html,
            body {
                margin: 0;
            }

            #editor {
                width: 100vw;
                height: 100vh;
            }
        </style>
    </head>
    <body>
        <div id="editor"></div>

        <script src="https://cdn.jsdelivr.net/npm/raflogn@2.0.2-beta.3/dist/bundle.js"></script>
        <script>
            const viewModel = RaflognJS.createRaflogn(document.getElementById("editor"));
            const TestNode = RaflognJS.Core.defineNode({
                type: "TestNode",
                inputs: {
                    a: () => new RaflognJS.RendererVue.TextInputInterface("Hello", "world"),
                },
                outputs: {
                    b: () => new RaflognJS.RendererVue.TextInputInterface("Hello", "world"),
                },
            });
            viewModel.editor.registerNodeType(TestNode);
        </script>
    </body>
</html>

```
