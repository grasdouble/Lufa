import{j as u}from"./jsx-runtime-D_zvdyIk.js";import{S as d,a,b as r,c as t,d as n,e as o,f as l,P as y}from"./lufa-ui-Bz09sRql.js";const S={title:"1. Components/Stack",component:d,parameters:{layout:"centered"},tags:[""]},g={nbPlaceholders:{control:{type:"number"},table:{category:"Customize Story content",defaultValue:{summary:3}}},gap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(l)},table:{category:"Properties",defaultValue:{summary:l.normal}}},direction:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(o)},table:{category:"Properties",defaultValue:{summary:o.vertical}}},padding:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(n)},table:{category:"Properties",defaultValue:{summary:n.none}}},align:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(t)},table:{category:"Properties",defaultValue:{summary:t.stretch}}},justify:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(r)},table:{category:"Properties",defaultValue:{summary:r.start}}},wrap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(a)},table:{category:"Properties",defaultValue:{summary:a.nowrap}}}},b={nbPlaceholders:3,gap:l.normal,direction:o.vertical,padding:n.none,align:t.stretch,justify:r.start,wrap:a.nowrap},e={argTypes:g,args:b,render:s=>u.jsx(d,{...s,children:Array.from({length:s.nbPlaceholders}).map((f,c)=>u.jsx(y,{children:c},c))})};var m,i,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  argTypes,
  args,
  render: args => {
    return <Stack {...args}>
                {Array.from({
        length: args.nbPlaceholders
      }).map((_, index) => <Placeholder key={index}>{index}</Placeholder>)}
            </Stack>;
  }
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const h=["Default"];export{e as Default,h as __namedExportsOrder,S as default};
