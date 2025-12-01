import{j as e}from"./iframe-9sJc_ofn.js";import{p as r}from"./lufa-ui-CZNmcjrL.js";import"./preload-helper-PPVm8Dsz.js";const w={title:"0. Design System/Colors/Primitives",parameters:{layout:"padded"},tags:["autodocs"]},A=({name:i,value:a,shade:n,contrastRatio:s})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",minWidth:"120px"},children:[e.jsx("div",{style:{width:"100px",height:"100px",backgroundColor:a,borderRadius:"8px",border:"1px solid #E5E5E5",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"}}),e.jsxs("div",{style:{textAlign:"center",fontSize:"12px"},children:[e.jsxs("div",{style:{fontWeight:"600",marginBottom:"4px"},children:[i,"-",n]}),e.jsx("div",{style:{color:"#737373",fontFamily:"monospace"},children:a}),s&&e.jsx("div",{style:{marginTop:"4px",fontSize:"11px",color:"#16A34A",fontWeight:"500"},children:s})]})]}),o=({name:i,colors:a,description:n})=>e.jsxs("div",{style:{marginBottom:"40px"},children:[e.jsxs("div",{style:{marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"20px",fontWeight:"600"},children:i}),n&&e.jsx("p",{style:{margin:0,color:"#737373",fontSize:"14px"},children:n})]}),e.jsx("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:Object.entries(a).map(([s,h])=>{let j="";const S=Number(s);return S>=600?j="AAA":S>=500&&(j="AA"),e.jsx(A,{name:i,value:h,shade:s,contrastRatio:j},s)})})]}),t={render:()=>e.jsxs("div",{style:{padding:"20px",maxWidth:"1200px"},children:[e.jsx("h1",{style:{marginBottom:"16px"},children:"Primitive Colors"}),e.jsx("p",{style:{marginBottom:"32px",color:"#737373",fontSize:"16px"},children:"Base color values following WCAG 2.1 accessibility guidelines. Colors marked with AAA meet 7:1 contrast ratio on white. Colors marked with AA meet 4.5:1 contrast ratio."}),e.jsx(o,{name:"Neutral",colors:r.neutral,description:"Grayscale colors for text, backgrounds, and borders"}),e.jsx(o,{name:"Blue",colors:r.blue,description:"Primary brand color"}),e.jsx(o,{name:"Green",colors:r.green,description:"Success and positive states"}),e.jsx(o,{name:"Red",colors:r.red,description:"Error and danger states"}),e.jsx(o,{name:"Orange",colors:r.orange,description:"Warning and caution states"}),e.jsx(o,{name:"Yellow",colors:r.yellow,description:"Warning and attention states"}),e.jsx(o,{name:"Purple",colors:r.purple,description:"Info and secondary brand"}),e.jsx(o,{name:"Teal",colors:r.teal,description:"Accent color"}),e.jsx(o,{name:"Pink",colors:r.pink,description:"Additional accent color"}),e.jsx(o,{name:"Indigo",colors:r.indigo,description:"Additional accent color"})]})},d={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Neutral",colors:r.neutral,description:"Grayscale colors for text, backgrounds, and borders"})})},c={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Blue",colors:r.blue,description:"Primary brand color"})})},l={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Green",colors:r.green,description:"Success and positive states"})})},p={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Red",colors:r.red,description:"Error and danger states"})})},m={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Orange",colors:r.orange,description:"Warning and caution states"})})},x={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Yellow",colors:r.yellow,description:"Warning and attention states"})})},g={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Purple",colors:r.purple,description:"Info and secondary brand"})})},u={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Teal",colors:r.teal,description:"Accent color"})})},v={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Pink",colors:r.pink,description:"Additional accent color"})})},y={render:()=>e.jsx("div",{style:{padding:"20px"},children:e.jsx(o,{name:"Indigo",colors:r.indigo,description:"Additional accent color"})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px',
    maxWidth: '1200px'
  }}>
            <h1 style={{
      marginBottom: '16px'
    }}>Primitive Colors</h1>
            <p style={{
      marginBottom: '32px',
      color: '#737373',
      fontSize: '16px'
    }}>
                Base color values following WCAG 2.1 accessibility guidelines. Colors marked with AAA meet 7:1 contrast ratio on white.
                Colors marked with AA meet 4.5:1 contrast ratio.
            </p>

            <ColorScale name="Neutral" colors={primitives.neutral} description="Grayscale colors for text, backgrounds, and borders" />

            <ColorScale name="Blue" colors={primitives.blue} description="Primary brand color" />

            <ColorScale name="Green" colors={primitives.green} description="Success and positive states" />

            <ColorScale name="Red" colors={primitives.red} description="Error and danger states" />

            <ColorScale name="Orange" colors={primitives.orange} description="Warning and caution states" />

            <ColorScale name="Yellow" colors={primitives.yellow} description="Warning and attention states" />

            <ColorScale name="Purple" colors={primitives.purple} description="Info and secondary brand" />

            <ColorScale name="Teal" colors={primitives.teal} description="Accent color" />

            <ColorScale name="Pink" colors={primitives.pink} description="Additional accent color" />

            <ColorScale name="Indigo" colors={primitives.indigo} description="Additional accent color" />
        </div>
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Neutral" colors={primitives.neutral} description="Grayscale colors for text, backgrounds, and borders" />
        </div>
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Blue" colors={primitives.blue} description="Primary brand color" />
        </div>
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Green" colors={primitives.green} description="Success and positive states" />
        </div>
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Red" colors={primitives.red} description="Error and danger states" />
        </div>
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Orange" colors={primitives.orange} description="Warning and caution states" />
        </div>
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Yellow" colors={primitives.yellow} description="Warning and attention states" />
        </div>
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Purple" colors={primitives.purple} description="Info and secondary brand" />
        </div>
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Teal" colors={primitives.teal} description="Accent color" />
        </div>
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Pink" colors={primitives.pink} description="Additional accent color" />
        </div>
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <ColorScale name="Indigo" colors={primitives.indigo} description="Additional accent color" />
        </div>
}`,...y.parameters?.docs?.source}}};const P=["AllPrimitives","Neutral","Blue","Green","Red","Orange","Yellow","Purple","Teal","Pink","Indigo"];export{t as AllPrimitives,c as Blue,l as Green,y as Indigo,d as Neutral,m as Orange,v as Pink,g as Purple,p as Red,u as Teal,x as Yellow,P as __namedExportsOrder,w as default};
