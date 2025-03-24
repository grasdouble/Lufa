import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as n,a as l,b as c,c as m,d as u,e as p,f as d,P as t}from"./lufa-ui-C4kTQkyK.js";const j={title:"1. Components/Stack",component:n,parameters:{layout:"centered"},tags:[""]},T={gap:{control:{type:"inline-radio"},type:{name:"enum",value:d},table:{category:"Properties",defaultValue:{summary:d.normal}}},direction:{control:{type:"radio"},type:{name:"enum",value:p},table:{category:"Properties",defaultValue:{summary:p.horizontal}}},padding:{control:{type:"radio"},type:{name:"enum",value:u},table:{category:"Properties",defaultValue:{summary:u.none}}},align:{control:{type:"radio"},type:{name:"enum",value:m},table:{category:"Properties",defaultValue:{summary:m.stretch}}},justify:{control:{type:"radio"},type:{name:"enum",value:c},table:{category:"Properties",defaultValue:{summary:c.start}}},wrap:{control:{type:"radio"},type:{name:"enum",value:l},table:{category:"Properties",defaultValue:{summary:l.nowrap}}}},r={argTypes:T,render:o=>e.jsx(e.Fragment,{children:e.jsxs(n,{children:[e.jsx(t,{}),e.jsx(t,{}),e.jsx(t,{})]})})},a={argTypes:T,render:o=>e.jsx(n,{...o,children:Array.from({length:50}).map((h,s)=>e.jsx(t,{children:s},s))})};var y,i,g;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  argTypes: argsTypes,
  render: args => {
    return <>
                <Stack>
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
            </>;
  }
}`,...(g=(i=r.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var P,S,f;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  argTypes: argsTypes,
  render: args => {
    return <Stack {...args}>
                {Array.from({
        length: 50
      }).map((_, index) => <Placeholder key={index}>{index}</Placeholder>)}
            </Stack>;
  }
}`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};const _=["Default","Playground"];export{r as Default,a as Playground,_ as __namedExportsOrder,j as default};
