import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./lufa-ui-Bg-85GOH.js";const y={title:"2. OLD/Components/Badge",component:r,parameters:{layout:"centered"},tags:[""],argTypes:{label:{control:"text",description:"The text to display"},color:{control:"select",description:"The color used in the badge",value:"gray",options:["gray","red","yellow","green","blue","indigo","purple"]},size:{control:"select",description:"The size of the badge",options:["small","medium","large"]}}},a={args:{label:"Marketing",color:"gray",size:"small"}},s={decorators:[()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"red",label:"Backend"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"yellow",label:"QA"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"green",label:"Design"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"blue",label:"DevOps"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"indigo",label:"UX"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,color:"purple",label:"Product"})})]})]},n={decorators:[()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,label:"small"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,size:"medium",label:"medium"})}),e.jsx("span",{style:{margin:"0.5em"},children:e.jsx(r,{...a.args,size:"large",label:"large"})})]})]};var l,o,i;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: "Marketing",
    color: "gray",
    size: "small"
  }
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var m,t,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(g=(t=s.parameters)==null?void 0:t.docs)==null?void 0:g.source}}};var c,p,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const u=["Primary","AllColors","AllSize"],j=Object.freeze(Object.defineProperty({__proto__:null,AllColors:s,AllSize:n,Primary:a,__namedExportsOrder:u,default:y},Symbol.toStringTag,{value:"Module"}));export{s as A,j as B,n as a};
