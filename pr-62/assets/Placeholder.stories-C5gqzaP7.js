import{j as e}from"./iframe-9sJc_ofn.js";import{P as r}from"./lufa-ui-CZNmcjrL.js";import"./preload-helper-PPVm8Dsz.js";const c={title:"1. Components/Layout/Placeholder",component:r,parameters:{layout:"centered",docs:{description:{component:"A placeholder component used for layout spacing and visual structure. Useful during development and prototyping."}}},tags:["autodocs"]},n={render:()=>e.jsx(r,{})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{children:"Content 1"}),e.jsx(r,{children:"Content 2"}),e.jsx(r,{children:"Content 3"})]})},o={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",width:"600px"},children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"}),e.jsx(r,{children:"6"})]})},a={render:()=>e.jsxs("div",{style:{maxWidth:"800px",padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"8px"},children:[e.jsx("h2",{style:{marginBottom:"16px"},children:"Page Layout Example"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{children:"Header Section"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[e.jsx(r,{children:"Main Content"}),e.jsx(r,{children:"Sidebar"})]}),e.jsx(r,{children:"Footer Section"})]})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Placeholder />
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
            <Placeholder>Content 1</Placeholder>
            <Placeholder>Content 2</Placeholder>
            <Placeholder>Content 3</Placeholder>
        </div>
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '600px'
  }}>
            <Placeholder>1</Placeholder>
            <Placeholder>2</Placeholder>
            <Placeholder>3</Placeholder>
            <Placeholder>4</Placeholder>
            <Placeholder>5</Placeholder>
            <Placeholder>6</Placeholder>
        </div>
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  }}>
            <h2 style={{
      marginBottom: '16px'
    }}>Page Layout Example</h2>
            <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
                <Placeholder>Header Section</Placeholder>
                <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px'
      }}>
                    <Placeholder>Main Content</Placeholder>
                    <Placeholder>Sidebar</Placeholder>
                </div>
                <Placeholder>Footer Section</Placeholder>
            </div>
        </div>
}`,...a.parameters?.docs?.source}}};const i=["Default","WithCustomContent","InGrid","UsageExample"];export{n as Default,o as InGrid,a as UsageExample,l as WithCustomContent,i as __namedExportsOrder,c as default};
