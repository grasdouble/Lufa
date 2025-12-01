import{j as e}from"./iframe-DVJgsUcM.js";import{B as r}from"./lufa-ui-CX_Qt84H.js";const l={title:"2. OLD/Components/Badge",component:r,parameters:{layout:"centered"},tags:[""],argTypes:{label:{control:"text",description:"The text to display"},color:{control:"select",description:"The color used in the badge",value:"gray",options:["gray","red","yellow","green","blue","indigo","purple"]},size:{control:"select",description:"The size of the badge",options:["small","medium","large"]}}},a={args:{label:"Marketing",color:"gray",size:"small"}},s={decorators:[()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"red",label:"Backend"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"yellow",label:"QA"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"green",label:"Design"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"blue",label:"DevOps"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"indigo",label:"UX"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"purple",label:"Product"})})]})]},n={decorators:[()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,label:"small"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,size:"medium",label:"medium"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,size:"large",label:"large"})})]})]};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Marketing",
    color: "gray",
    size: "small"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  decorators: [() => <>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="red" label="Backend" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="yellow" label="QA" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="green" label="Design" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="blue" label="DevOps" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="indigo" label="UX" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} color="purple" label="Product" />
        </span>
      </>]
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [() => <>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} label="small" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} size="medium" label="medium" />
        </span>
        <span style={{
      margin: "0.5em"
    }}>
          <Badge {...Primary.args} size="large" label="large" />
        </span>
      </>]
}`,...n.parameters?.docs?.source}}};const o=["Primary","AllColors","AllSize"],t=Object.freeze(Object.defineProperty({__proto__:null,AllColors:s,AllSize:n,Primary:a,__namedExportsOrder:o,default:l},Symbol.toStringTag,{value:"Module"}));export{s as A,t as B,n as a};
