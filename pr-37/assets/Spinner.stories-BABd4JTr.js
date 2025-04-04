import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{S as a}from"./lufa-ui-BrOryYgL.js";const u={title:"1. Components/Spinner",component:a,parameters:{layout:"centered"},tags:[""]},i={size:{control:{type:"select",options:["small","medium","large"]},type:{name:"enum",value:["small","medium","large"]},description:"Size of the spinner",table:{type:{summary:"small | medium | large"},category:"Properties",defaultValue:{summary:"medium"}}},mode:{control:{type:"select",options:["A","B"]},type:{name:"enum",value:["A","B"]},description:"Mode of the spinner. It will define which spinner will be used",table:{type:{summary:"A | B"},category:"Properties",defaultValue:{summary:"A"}}}},p={size:"medium",mode:"A"},e={argTypes:i,args:p,render:({size:n,mode:m})=>o.jsx(a,{size:n,mode:m})};var r,s,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  argTypes: argTypes,
  args: args,
  render: ({
    size,
    mode
  }) => {
    return <Spinner size={size} mode={mode} />;
  }
}`,...(t=(s=e.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};const c=["Primary"];export{e as Primary,c as __namedExportsOrder,u as default};
