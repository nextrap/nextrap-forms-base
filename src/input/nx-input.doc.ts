import {registerComponent} from "@nextrap/doc-visualizer";


registerComponent({
    package: "input",
    description: "Input component",
    title: "NxInput",
    examples: [
        {
            title: "Basic input",
            description: "Basic input example",
            lang: "html",
            // language=html
            code: `
<nx-input label="Input Label" placeholder="Input Placeholder"></nx-input>
<nx-input label="Input Label" placeholder="Input Placeholder" ></nx-input>
<nx-input label="Input Label" type="select" options="a,b,c" placeholder="Input Placeholder2" ></nx-input>
<nx-input label="Input Label" type="radio" name="wurst" options="a,b,c" placeholder="Input Placeholder2" ></nx-input>

`
        },
        {
            title: "Input with value",
            description: "Input example with value",
            lang: "html",
            code: `<nx-input label="Input Label" placeholder="Input Placeholder" value="Input Value"></nx-input>`
        }
        ]
})
