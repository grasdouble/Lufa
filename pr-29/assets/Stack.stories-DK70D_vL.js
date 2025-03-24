import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as m,a as s,b as o,c as l,d as c,e as u,f as i,P as t}from"./lufa-ui-Bz09sRql.js";const A={title:"1. Components/Stack",component:m,parameters:{layout:"centered"},tags:[""]},S={gap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(i)},table:{category:"Properties",defaultValue:{summary:i.normal}}},direction:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(u)},table:{category:"Properties",defaultValue:{summary:u.vertical}}},padding:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(c)},table:{category:"Properties",defaultValue:{summary:c.none}}},align:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(l)},table:{category:"Properties",defaultValue:{summary:l.stretch}}},justify:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(o)},table:{category:"Properties",defaultValue:{summary:o.start}}},wrap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(s)},table:{category:"Properties",defaultValue:{summary:s.nowrap}}}},h={gap:i.normal,direction:u.vertical,padding:c.none,align:l.stretch,justify:o.start,wrap:s.nowrap},a={argTypes:S,args:h,render:n=>e.jsx(e.Fragment,{children:e.jsxs(m,{...n,children:[e.jsx(t,{}),e.jsx(t,{}),e.jsx(t,{})]})})},r={argTypes:S,args:h,render:n=>e.jsx(m,{...n,children:Array.from({length:20}).map((v,d)=>e.jsx(t,{children:d},d))})};var p,y,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  argTypes,
  args,
  render: args => {
    return <>
                <Stack {...args}>
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </Stack>
            </>;
  }
}`,...(g=(y=a.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var P,j,f;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  argTypes,
  args,
  render: args => {
    return <Stack {...args}>
                {Array.from({
        length: 20
      }).map((_, index) => <Placeholder key={index}>{index}</Placeholder>)}
            </Stack>;
  }
}`,...(f=(j=r.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};const T=["Default","Playground"];export{a as Default,r as Playground,T as __namedExportsOrder,A as default};
