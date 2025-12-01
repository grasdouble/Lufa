import{j as a}from"./iframe-9sJc_ofn.js";import{l as n}from"./lufa-ui-CZNmcjrL.js";const r={title:"2. OLD/Components/Button",component:n,parameters:{layout:"centered"},tags:[""],argTypes:{label:{control:"text",description:"The text to display"},variant:{control:"select",description:"The variant used of button",value:"solid",options:["solid","text","dashed","link"]},danger:{control:"boolean",description:"The danger state of button"},disabled:{control:"boolean",description:"The disabled state of button"},size:{control:"select",description:"The size of the badge",options:["xsmall","small","medium","large"]}}},s={args:{label:"Button",variant:"solid",size:"medium",danger:!1,disabled:!1}},l={decorators:[()=>a.jsxs("div",{className:"grid grid-flow-col grid-rows-5 gap-4",children:[a.jsx("span",{children:"Default"}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"solid",label:"Solid"})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"text",label:"Text"})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"dashed",label:"dashed"})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"link",label:"Link"})}),a.jsx("span",{children:"Danger"}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"solid",label:"Solid",danger:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"text",label:"Text",danger:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"dashed",label:"dashed",danger:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"link",label:"Link",danger:!0})}),a.jsx("span",{children:"Disabled"}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"solid",label:"Solid",disabled:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"text",label:"Text",disabled:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"dashed",label:"dashed",disabled:!0})}),a.jsx("span",{children:a.jsx(n,{...s.args,variant:"link",label:"Link",disabled:!0})})]})]},e={decorators:[()=>a.jsxs("div",{className:"grid grid-flow-col grid-rows-5 gap-4",children:[a.jsx("span",{children:"x-small"}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"xsmall",size:"xsmall",variant:"solid"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"xsmall",size:"xsmall",variant:"text"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"xsmall",size:"xsmall",variant:"dashed"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"xsmall",size:"xsmall",variant:"link"})}),a.jsx("span",{children:"small"}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"small",size:"small",variant:"solid"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"small",size:"small",variant:"text"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"small",size:"small",variant:"dashed"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"small",size:"small",variant:"link"})}),a.jsx("span",{children:"medium"}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"medium",size:"medium",variant:"solid"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"medium",size:"medium",variant:"text"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"medium",size:"medium",variant:"dashed"})}),a.jsx("span",{children:a.jsx(n,{...s.args,label:"medium",size:"medium",variant:"link"})}),a.jsx("span",{children:"large"}),a.jsx("span",{children:a.jsx(n,{...s.args,size:"large",label:"large",variant:"solid"})}),a.jsx("span",{children:a.jsx(n,{...s.args,size:"large",label:"large",variant:"text"})}),a.jsx("span",{children:a.jsx(n,{...s.args,size:"large",label:"large",variant:"dashed"})}),a.jsx("span",{children:a.jsx(n,{...s.args,size:"large",label:"large",variant:"link"})})]})]};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    variant: 'solid',
    size: 'medium',
    danger: false,
    disabled: false
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div className="grid grid-flow-col grid-rows-5 gap-4">
                <span>Default</span>
                <span>
                    <Button {...Primary.args} variant="solid" label="Solid" />
                </span>
                <span>
                    <Button {...Primary.args} variant="text" label="Text" />
                </span>
                <span>
                    <Button {...Primary.args} variant="dashed" label="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} variant="link" label="Link" />
                </span>
                <span>Danger</span>
                <span>
                    <Button {...Primary.args} variant="solid" label="Solid" danger />
                </span>
                <span>
                    <Button {...Primary.args} variant="text" label="Text" danger />
                </span>
                <span>
                    <Button {...Primary.args} variant="dashed" label="dashed" danger />
                </span>
                <span>
                    <Button {...Primary.args} variant="link" label="Link" danger />
                </span>
                <span>Disabled</span>
                <span>
                    <Button {...Primary.args} variant="solid" label="Solid" disabled />
                </span>
                <span>
                    <Button {...Primary.args} variant="text" label="Text" disabled />
                </span>
                <span>
                    <Button {...Primary.args} variant="dashed" label="dashed" disabled />
                </span>
                <span>
                    <Button {...Primary.args} variant="link" label="Link" disabled />
                </span>
            </div>]
}`,...l.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div className="grid grid-flow-col grid-rows-5 gap-4">
                <span>x-small</span>
                <span>
                    <Button {...Primary.args} label="xsmall" size="xsmall" variant="solid" />
                </span>
                <span>
                    <Button {...Primary.args} label="xsmall" size="xsmall" variant="text" />
                </span>
                <span>
                    <Button {...Primary.args} label="xsmall" size="xsmall" variant="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} label="xsmall" size="xsmall" variant="link" />
                </span>
                <span>small</span>
                <span>
                    <Button {...Primary.args} label="small" size="small" variant="solid" />
                </span>
                <span>
                    <Button {...Primary.args} label="small" size="small" variant="text" />
                </span>
                <span>
                    <Button {...Primary.args} label="small" size="small" variant="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} label="small" size="small" variant="link" />
                </span>

                <span>medium</span>
                <span>
                    <Button {...Primary.args} label="medium" size="medium" variant="solid" />
                </span>
                <span>
                    <Button {...Primary.args} label="medium" size="medium" variant="text" />
                </span>
                <span>
                    <Button {...Primary.args} label="medium" size="medium" variant="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} label="medium" size="medium" variant="link" />
                </span>

                <span>large</span>
                <span>
                    <Button {...Primary.args} size="large" label="large" variant="solid" />
                </span>
                <span>
                    <Button {...Primary.args} size="large" label="large" variant="text" />
                </span>
                <span>
                    <Button {...Primary.args} size="large" label="large" variant="dashed" />
                </span>
                <span>
                    <Button {...Primary.args} size="large" label="large" variant="link" />
                </span>
            </div>]
}`,...e.parameters?.docs?.source}}};const i=["Primary","AllType","AllSize"],o=Object.freeze(Object.defineProperty({__proto__:null,AllSize:e,AllType:l,Primary:s,__namedExportsOrder:i,default:r},Symbol.toStringTag,{value:"Module"}));export{l as A,o as B,e as a};
