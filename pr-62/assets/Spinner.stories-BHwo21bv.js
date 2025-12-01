import{j as e}from"./iframe-9sJc_ofn.js";import{S as s}from"./lufa-ui-CZNmcjrL.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"1. Components/Feedback/Spinner",component:s,parameters:{layout:"centered",docs:{description:{component:"A loading spinner component to indicate processing or loading states. Available in multiple sizes and modes."}}},tags:["autodocs"],argTypes:{size:{control:"select",options:["small","medium","large"],description:"Size of the spinner",table:{type:{summary:"small | medium | large"},defaultValue:{summary:"medium"}}},mode:{control:"select",options:["A","B"],description:"Visual style variant of the spinner",table:{type:{summary:"A | B"},defaultValue:{summary:"A"}}}}},i={args:{size:"medium",mode:"A"}},r={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"32px"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{size:"small",mode:"A"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#737373"},children:"Small"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{size:"medium",mode:"A"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#737373"},children:"Medium"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(s,{size:"large",mode:"A"}),e.jsx("p",{style:{marginTop:"8px",fontSize:"12px",color:"#737373"},children:"Large"})]})]})},o={args:{size:"medium",mode:"A"}},n={args:{size:"medium",mode:"B"}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Mode A"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"32px"},children:[e.jsx(s,{size:"small",mode:"A"}),e.jsx(s,{size:"medium",mode:"A"}),e.jsx(s,{size:"large",mode:"A"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Mode B"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"32px"},children:[e.jsx(s,{size:"small",mode:"B"}),e.jsx(s,{size:"medium",mode:"B"}),e.jsx(s,{size:"large",mode:"B"})]})]})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px",padding:"20px"},children:[e.jsxs("div",{style:{padding:"40px",backgroundColor:"#f5f5f5",borderRadius:"8px",textAlign:"center"},children:[e.jsx(s,{size:"large",mode:"A"}),e.jsx("p",{style:{marginTop:"16px",color:"#737373"},children:"Loading content..."})]}),e.jsxs("button",{style:{padding:"12px 24px",backgroundColor:"#2563EB",color:"white",border:"none",borderRadius:"6px",cursor:"not-allowed",display:"flex",alignItems:"center",gap:"8px",justifyContent:"center"},disabled:!0,children:[e.jsx(s,{size:"small",mode:"A"}),"Processing..."]}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#EFF6FF",borderRadius:"6px",color:"#2563EB"},children:[e.jsx(s,{size:"small",mode:"A"}),e.jsx("span",{children:"Loading data"})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    mode: 'A'
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  }}>
            <div style={{
      textAlign: 'center'
    }}>
                <Spinner size="small" mode="A" />
                <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#737373'
      }}>Small</p>
            </div>
            <div style={{
      textAlign: 'center'
    }}>
                <Spinner size="medium" mode="A" />
                <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#737373'
      }}>Medium</p>
            </div>
            <div style={{
      textAlign: 'center'
    }}>
                <Spinner size="large" mode="A" />
                <p style={{
        marginTop: '8px',
        fontSize: '12px',
        color: '#737373'
      }}>Large</p>
            </div>
        </div>
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    mode: 'A'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    mode: 'B'
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Mode A</h3>
                <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
                    <Spinner size="small" mode="A" />
                    <Spinner size="medium" mode="A" />
                    <Spinner size="large" mode="A" />
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Mode B</h3>
                <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
                    <Spinner size="small" mode="B" />
                    <Spinner size="medium" mode="B" />
                    <Spinner size="large" mode="B" />
                </div>
            </div>
        </div>
}`,...d.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px'
  }}>
            <div style={{
      padding: '40px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
                <Spinner size="large" mode="A" />
                <p style={{
        marginTop: '16px',
        color: '#737373'
      }}>Loading content...</p>
            </div>

            <button style={{
      padding: '12px 24px',
      backgroundColor: '#2563EB',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center'
    }} disabled>
                <Spinner size="small" mode="A" />
                Processing...
            </button>

            <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#EFF6FF',
      borderRadius: '6px',
      color: '#2563EB'
    }}>
                <Spinner size="small" mode="A" />
                <span>Loading data</span>
            </div>
        </div>
}`,...a.parameters?.docs?.source}}};const c=["Default","AllSizes","ModeA","ModeB","AllVariants","InContext"];export{r as AllSizes,d as AllVariants,i as Default,a as InContext,o as ModeA,n as ModeB,c as __namedExportsOrder,m as default};
