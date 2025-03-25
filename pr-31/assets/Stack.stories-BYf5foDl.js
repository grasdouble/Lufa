import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r,a as l,b as m,c as s,d as c,e as i,f as u,P as n}from"./lufa-ui-D98RJmy4.js";const A={title:"1. Components/Stack",component:r,parameters:{layout:"centered"},tags:[""]},x={nbPlaceholders:{control:{type:"number"},table:{category:"Customize Story content",defaultValue:{summary:3}}},gap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(u)},table:{category:"Properties",defaultValue:{summary:u.normal}}},direction:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(i)},table:{category:"Properties",defaultValue:{summary:i.vertical}}},padding:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(c)},table:{category:"Properties",defaultValue:{summary:c.none}}},align:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(s)},table:{category:"Properties",defaultValue:{summary:s.stretch}}},justify:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(m)},table:{category:"Properties",defaultValue:{summary:m.start}}},wrap:{control:{type:"inline-radio"},type:{name:"enum",value:Object.values(l)},table:{category:"Properties",defaultValue:{summary:l.nowrap}}}},P={nbPlaceholders:3,gap:u.normal,direction:i.vertical,padding:c.none,align:s.stretch,justify:m.start,wrap:l.nowrap},o={argTypes:x,args:P,render:t=>e.jsx(r,{...t,children:Array.from({length:t.nbPlaceholders}).map((a,p)=>e.jsx(n,{children:p},p))})},b={grow:!0,example:"mode 1"},f={grow:{control:{type:"boolean"},table:{category:"Properties",defaultValue:{summary:"true"}}},example:{control:{type:"inline-radio"},type:{name:"enum",value:["mode 1","mode 2","mode 3","mode 4","mode 5","mode 6"]},table:{category:"Properties",defaultValue:{summary:"false"}}}},d={args:b,argTypes:f,render:({grow:t,example:a})=>e.jsx(e.Fragment,{children:e.jsxs(r,{gap:"normal",direction:"horizontal",align:"center",justify:"space-between",wrap:"nowrap",children:[e.jsx(r.Item,{grow:t&&["mode 1","mode 4","mode 6"].includes(a),children:e.jsx(n,{children:["mode 1","mode 4","mode 6"].includes(a)?"Adjust this item":"Fixed width"})}),e.jsx(r.Item,{grow:t&&["mode 2","mode 4","mode 5"].includes(a),children:e.jsx(n,{children:["mode 2","mode 4","mode 5"].includes(a)?"Adjust this item":"Fixed width"})}),e.jsx(r.Item,{grow:t&&["mode 3","mode 5","mode 6"].includes(a),children:e.jsx(n,{children:["mode 3","mode 5","mode 6"].includes(a)?"Adjust this item":"Fixed width"})})]})})};var g,y,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  argTypes,
  args,
  render: args => {
    return <Stack {...args}>
                {Array.from({
        length: args.nbPlaceholders
      }).map((_, index) => <Placeholder key={index}>{index}</Placeholder>)}
            </Stack>;
  }
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var S,j,w;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: argStackItem,
  argTypes: argTypesStackItem,
  render: ({
    grow,
    example
  }) => {
    return <>
                <Stack gap="normal" direction="horizontal" align="center" justify="space-between" wrap="nowrap">
                    <Stack.Item grow={grow && ['mode 1', 'mode 4', 'mode 6'].includes(example)}>
                        <Placeholder>
                            {['mode 1', 'mode 4', 'mode 6'].includes(example) ? 'Adjust this item' : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                    <Stack.Item grow={grow && ['mode 2', 'mode 4', 'mode 5'].includes(example)}>
                        <Placeholder>
                            {['mode 2', 'mode 4', 'mode 5'].includes(example) ? 'Adjust this item' : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                    <Stack.Item grow={grow && ['mode 3', 'mode 5', 'mode 6'].includes(example)}>
                        <Placeholder>
                            {['mode 3', 'mode 5', 'mode 6'].includes(example) ? 'Adjust this item' : 'Fixed width'}
                        </Placeholder>
                    </Stack.Item>
                </Stack>
            </>;
  }
}`,...(w=(j=d.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const v=["Default","StackItem"];export{o as Default,d as StackItem,v as __namedExportsOrder,A as default};
