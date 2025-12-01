import{j as e}from"./iframe-DVJgsUcM.js";import{P as l,p as i}from"./lufa-ui-CX_Qt84H.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"1. Components/Layout/Placeholder",component:l,parameters:{layout:"padded",docs:{description:{component:"A placeholder component used for layout spacing and visual structure. Features customizable height, width, and color variants. Useful during development and prototyping."}}},tags:["autodocs"],argTypes:{height:{control:"select",options:["small","medium","large","auto","full"],description:"Height variant of the placeholder"},width:{control:"select",options:["auto","small","medium","large","full"],description:"Width variant of the placeholder"},color:{control:"color",description:"Custom background color (any valid CSS color)"},children:{control:"text",description:"Content to display inside the placeholder"}}},r={args:{children:"Default Placeholder"}},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"400px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Small (40px)"}),e.jsx(l,{height:"small",children:"Small Height"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Medium (80px) - Default"}),e.jsx(l,{height:"medium",children:"Medium Height"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Large (128px)"}),e.jsx(l,{height:"large",children:"Large Height"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Auto"}),e.jsxs(l,{height:"auto",children:["Auto height adjusts to content",e.jsx("br",{}),"Multiple lines supported",e.jsx("br",{}),"Grows as needed"]})]})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Auto (min-width: 96px)"}),e.jsx(l,{width:"auto",children:"Auto"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Small (128px)"}),e.jsx(l,{width:"small",children:"Small Width"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Medium (240px)"}),e.jsx(l,{width:"medium",children:"Medium Width"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Large (384px)"}),e.jsx(l,{width:"large",children:"Large Width"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Full (100%)"}),e.jsx(l,{width:"full",children:"Full Width"})]})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"400px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Default (Violet Gradient)"}),e.jsx(l,{children:"Default Color"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Blue"}),e.jsx(l,{color:i.blue[600],children:"Blue"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Green"}),e.jsx(l,{color:i.green[600],children:"Green"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Red"}),e.jsx(l,{color:i.red[600],children:"Red"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Purple"}),e.jsx(l,{color:i.purple[600],children:"Purple"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Indigo"}),e.jsx(l,{color:i.indigo[600],children:"Indigo"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Orange"}),e.jsx(l,{color:i.orange[600],children:"Orange"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"14px",fontWeight:"600"},children:"Neutral"}),e.jsx(l,{color:i.neutral[600],children:"Neutral"})]})]})},a={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px"},children:[e.jsx(l,{height:"small",width:"small",color:i.blue[500],children:"Small × Small"}),e.jsx(l,{height:"small",width:"medium",color:i.green[500],children:"Small × Medium"}),e.jsx(l,{height:"small",width:"large",color:i.red[500],children:"Small × Large"}),e.jsx(l,{height:"medium",width:"small",color:i.purple[500],children:"Medium × Small"}),e.jsx(l,{height:"medium",width:"medium",color:i.indigo[500],children:"Medium × Medium"}),e.jsx(l,{height:"medium",width:"large",color:i.orange[500],children:"Medium × Large"}),e.jsx(l,{height:"large",width:"small",color:i.teal[500],children:"Large × Small"}),e.jsx(l,{height:"large",width:"medium",color:i.pink[500],children:"Large × Medium"}),e.jsx(l,{height:"large",width:"large",color:i.yellow[600],children:"Large × Large"})]})},n={render:()=>e.jsxs("div",{style:{maxWidth:"900px",padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"8px"},children:[e.jsx("h2",{style:{marginBottom:"16px"},children:"Dashboard Layout Example"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(l,{height:"small",width:"full",color:i.blue[600],children:"Header - Small Height, Full Width"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"200px 1fr",gap:"16px"},children:[e.jsx(l,{height:"full",width:"full",color:i.purple[500],children:"Sidebar"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(l,{height:"medium",width:"full",color:i.green[500],children:"Content Area"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px"},children:[e.jsx(l,{height:"small",color:i.orange[500],children:"Card 1"}),e.jsx(l,{height:"small",color:i.orange[500],children:"Card 2"}),e.jsx(l,{height:"small",color:i.orange[500],children:"Card 3"})]})]})]}),e.jsx(l,{height:"small",width:"full",color:i.neutral[600],children:"Footer - Small Height, Full Width"})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default Placeholder'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '400px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Small (40px)</h3>
                <Placeholder height="small">Small Height</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Medium (80px) - Default</h3>
                <Placeholder height="medium">Medium Height</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Large (128px)</h3>
                <Placeholder height="large">Large Height</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Auto</h3>
                <Placeholder height="auto">
                    Auto height adjusts to content
                    <br />
                    Multiple lines supported
                    <br />
                    Grows as needed
                </Placeholder>
            </div>
        </div>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Auto (min-width: 96px)</h3>
                <Placeholder width="auto">Auto</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Small (128px)</h3>
                <Placeholder width="small">Small Width</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Medium (240px)</h3>
                <Placeholder width="medium">Medium Width</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Large (384px)</h3>
                <Placeholder width="large">Large Width</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Full (100%)</h3>
                <Placeholder width="full">Full Width</Placeholder>
            </div>
        </div>
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '400px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Default (Violet Gradient)</h3>
                <Placeholder>Default Color</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Blue</h3>
                <Placeholder color={primitives.blue[600]}>Blue</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Green</h3>
                <Placeholder color={primitives.green[600]}>Green</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Red</h3>
                <Placeholder color={primitives.red[600]}>Red</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Purple</h3>
                <Placeholder color={primitives.purple[600]}>Purple</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Indigo</h3>
                <Placeholder color={primitives.indigo[600]}>Indigo</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Orange</h3>
                <Placeholder color={primitives.orange[600]}>Orange</Placeholder>
            </div>
            <div>
                <h3 style={{
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>Neutral</h3>
                <Placeholder color={primitives.neutral[600]}>Neutral</Placeholder>
            </div>
        </div>
}`,...d.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  }}>
            <Placeholder height="small" width="small" color={primitives.blue[500]}>
                Small × Small
            </Placeholder>
            <Placeholder height="small" width="medium" color={primitives.green[500]}>
                Small × Medium
            </Placeholder>
            <Placeholder height="small" width="large" color={primitives.red[500]}>
                Small × Large
            </Placeholder>
            <Placeholder height="medium" width="small" color={primitives.purple[500]}>
                Medium × Small
            </Placeholder>
            <Placeholder height="medium" width="medium" color={primitives.indigo[500]}>
                Medium × Medium
            </Placeholder>
            <Placeholder height="medium" width="large" color={primitives.orange[500]}>
                Medium × Large
            </Placeholder>
            <Placeholder height="large" width="small" color={primitives.teal[500]}>
                Large × Small
            </Placeholder>
            <Placeholder height="large" width="medium" color={primitives.pink[500]}>
                Large × Medium
            </Placeholder>
            <Placeholder height="large" width="large" color={primitives.yellow[600]}>
                Large × Large
            </Placeholder>
        </div>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '900px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  }}>
            <h2 style={{
      marginBottom: '16px'
    }}>Dashboard Layout Example</h2>
            <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
                <Placeholder height="small" width="full" color={primitives.blue[600]}>
                    Header - Small Height, Full Width
                </Placeholder>
                <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '16px'
      }}>
                    <Placeholder height="full" width="full" color={primitives.purple[500]}>
                        Sidebar
                    </Placeholder>
                    <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
                        <Placeholder height="medium" width="full" color={primitives.green[500]}>
                            Content Area
                        </Placeholder>
                        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 1
                            </Placeholder>
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 2
                            </Placeholder>
                            <Placeholder height="small" color={primitives.orange[500]}>
                                Card 3
                            </Placeholder>
                        </div>
                    </div>
                </div>
                <Placeholder height="small" width="full" color={primitives.neutral[600]}>
                    Footer - Small Height, Full Width
                </Placeholder>
            </div>
        </div>
}`,...n.parameters?.docs?.source}}};const p=["Default","HeightVariants","WidthVariants","ColorVariants","CombinedVariants","LayoutExample"];export{d as ColorVariants,a as CombinedVariants,r as Default,t as HeightVariants,n as LayoutExample,o as WidthVariants,p as __namedExportsOrder,m as default};
