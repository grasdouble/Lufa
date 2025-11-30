import{j as a}from"./iframe-CSjvfQKM.js";import{S as r}from"./lufa-ui-dgMO0WjF.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"1. Components/Spinner",component:r,parameters:{layout:"centered"},tags:[""]},n={size:{control:{type:"select",options:["small","medium","large"]},type:{name:"enum",value:["small","medium","large"]},description:"Size of the spinner",table:{type:{summary:"small | medium | large"},category:"Properties",defaultValue:{summary:"medium"}}},mode:{control:{type:"select",options:["A","B"]},type:{name:"enum",value:["A","B"]},description:"Mode of the spinner. It will define which spinner will be used",table:{type:{summary:"A | B"},category:"Properties",defaultValue:{summary:"A"}}}},m={size:"medium",mode:"A"},e={argTypes:n,args:m,render:({size:s,mode:t})=>a.jsx(r,{size:s,mode:t})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  argTypes: argTypes,
  args: args,
  render: ({
    size,
    mode
  }) => {
    return <Spinner size={size} mode={mode} />;
  }
}`,...e.parameters?.docs?.source}}};const d=["Primary"];export{e as Primary,d as __namedExportsOrder,l as default};
