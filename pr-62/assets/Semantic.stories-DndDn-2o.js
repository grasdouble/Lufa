import{j as r}from"./iframe-DVJgsUcM.js";import{s as o}from"./lufa-ui-CX_Qt84H.js";import"./preload-helper-PPVm8Dsz.js";const b={title:"0. Design System/Colors/Semantic",parameters:{layout:"padded"},tags:["autodocs"]},e=({title:p,colors:x,description:d})=>r.jsxs("div",{style:{marginBottom:"32px",padding:"20px",backgroundColor:"#FAFAFA",borderRadius:"12px",border:"1px solid #E5E5E5"},children:[r.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"18px",fontWeight:"600"},children:p}),d&&r.jsx("p",{style:{margin:"0 0 16px 0",color:"#737373",fontSize:"14px"},children:d}),r.jsx("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:Object.entries(x).map(([l,c])=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"140px"},children:[r.jsx("div",{style:{width:"140px",height:"80px",backgroundColor:c,borderRadius:"6px",border:"1px solid #E5E5E5",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}),r.jsxs("div",{style:{fontSize:"12px"},children:[r.jsx("div",{style:{fontWeight:"600",marginBottom:"2px"},children:l}),r.jsx("div",{style:{color:"#737373",fontFamily:"monospace",fontSize:"11px"},children:c})]})]},l))})]}),t={render:()=>r.jsxs("div",{style:{padding:"20px",maxWidth:"1200px"},children:[r.jsx("h1",{style:{marginBottom:"16px"},children:"Semantic Colors"}),r.jsx("p",{style:{marginBottom:"32px",color:"#737373",fontSize:"16px"},children:"Intent-based color tokens for consistent usage across components. All semantic colors meet WCAG 2.1 accessibility standards when used as intended."}),r.jsx(e,{title:"Text Colors",colors:o.text,description:"Colors for different text hierarchies and states"}),r.jsx(e,{title:"Background Colors",colors:o.background,description:"Colors for various background surfaces"}),r.jsx(e,{title:"Border Colors",colors:o.border,description:"Colors for borders and dividers"}),r.jsx(e,{title:"Interactive Colors",colors:o.interactive,description:"Colors for interactive elements like buttons and links"}),r.jsx(e,{title:"Success Colors",colors:o.success,description:"Colors for success states and positive feedback"}),r.jsx(e,{title:"Warning Colors",colors:o.warning,description:"Colors for warning states and caution"}),r.jsx(e,{title:"Error Colors",colors:o.error,description:"Colors for error states and danger"}),r.jsx(e,{title:"Info Colors",colors:o.info,description:"Colors for informational states"}),r.jsx(e,{title:"Brand Colors",colors:o.brand,description:"Primary and secondary brand colors"}),r.jsx(e,{title:"Surface Colors",colors:o.surface,description:"Colors for cards, panels, and elevated surfaces"}),r.jsx(e,{title:"Shadow Colors",colors:o.shadow,description:"Colors for shadows and depth"})]})},s={render:()=>r.jsxs("div",{style:{padding:"20px"},children:[r.jsx(e,{title:"Text Colors",colors:o.text,description:"Colors for different text hierarchies and states"}),r.jsxs("div",{style:{padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[r.jsx("h4",{style:{marginBottom:"16px"},children:"Examples"}),r.jsx("p",{style:{color:o.text.primary,marginBottom:"8px"},children:"Primary text - Main content"}),r.jsx("p",{style:{color:o.text.secondary,marginBottom:"8px"},children:"Secondary text - Supporting content"}),r.jsx("p",{style:{color:o.text.tertiary,marginBottom:"8px"},children:"Tertiary text - Helper text"}),r.jsx("p",{style:{color:o.text.disabled,marginBottom:"8px"},children:"Disabled text"}),r.jsx("div",{style:{backgroundColor:o.background.inverse,padding:"12px",borderRadius:"6px",marginBottom:"8px"},children:r.jsx("p",{style:{color:o.text.inverse,margin:0},children:"Inverse text on dark background"})}),r.jsx("a",{href:"#",style:{color:o.text.link},children:"Link text"})]})]})},i={render:()=>r.jsxs("div",{style:{padding:"20px"},children:[r.jsx(e,{title:"Interactive Colors",colors:o.interactive,description:"Colors for interactive elements like buttons and links"}),r.jsxs("div",{style:{padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[r.jsx("h4",{style:{marginBottom:"16px"},children:"Button Examples"}),r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx("button",{style:{backgroundColor:o.interactive.default,color:o.text.inverse,padding:"10px 20px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"500"},children:"Default"}),r.jsx("button",{style:{backgroundColor:o.interactive.hover,color:o.text.inverse,padding:"10px 20px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"500"},children:"Hover"}),r.jsx("button",{style:{backgroundColor:o.interactive.active,color:o.text.inverse,padding:"10px 20px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"500"},children:"Active"}),r.jsx("button",{style:{backgroundColor:o.interactive.disabled,color:o.text.disabled,padding:"10px 20px",borderRadius:"6px",border:"none",cursor:"not-allowed",fontWeight:"500"},disabled:!0,children:"Disabled"})]})]})]})},n={render:()=>r.jsxs("div",{style:{padding:"20px"},children:[r.jsx("h2",{style:{marginBottom:"24px"},children:"Status Colors"}),r.jsx(e,{title:"Success Colors",colors:o.success,description:"Colors for success states and positive feedback"}),r.jsx(e,{title:"Warning Colors",colors:o.warning,description:"Colors for warning states and caution"}),r.jsx(e,{title:"Error Colors",colors:o.error,description:"Colors for error states and danger"}),r.jsx(e,{title:"Info Colors",colors:o.info,description:"Colors for informational states"}),r.jsxs("div",{style:{padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"8px",marginTop:"24px"},children:[r.jsx("h4",{style:{marginBottom:"16px"},children:"Alert Examples"}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[r.jsxs("div",{style:{backgroundColor:o.success.light,color:o.success.text,padding:"16px",borderRadius:"6px",borderLeft:`4px solid ${o.success.default}`},children:[r.jsx("strong",{children:"Success:"})," Operation completed successfully!"]}),r.jsxs("div",{style:{backgroundColor:o.warning.light,color:o.warning.text,padding:"16px",borderRadius:"6px",borderLeft:`4px solid ${o.warning.default}`},children:[r.jsx("strong",{children:"Warning:"})," Please review this information."]}),r.jsxs("div",{style:{backgroundColor:o.error.light,color:o.error.text,padding:"16px",borderRadius:"6px",borderLeft:`4px solid ${o.error.default}`},children:[r.jsx("strong",{children:"Error:"})," Something went wrong!"]}),r.jsxs("div",{style:{backgroundColor:o.info.light,color:o.info.text,padding:"16px",borderRadius:"6px",borderLeft:`4px solid ${o.info.default}`},children:[r.jsx("strong",{children:"Info:"})," Here's some helpful information."]})]})]})]})},a={render:()=>r.jsxs("div",{style:{padding:"20px"},children:[r.jsx(e,{title:"Brand Colors",colors:o.brand,description:"Primary and secondary brand colors"}),r.jsxs("div",{style:{padding:"20px",backgroundColor:"#FFFFFF",borderRadius:"8px",marginTop:"24px"},children:[r.jsx("h4",{style:{marginBottom:"16px"},children:"Brand Button Examples"}),r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx("button",{style:{backgroundColor:o.brand.primary,color:o.text.inverse,padding:"12px 24px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"14px"},children:"Primary Brand"}),r.jsx("button",{style:{backgroundColor:o.brand.secondary,color:o.text.inverse,padding:"12px 24px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"14px"},children:"Secondary Brand"}),r.jsx("button",{style:{backgroundColor:o.brand.accent,color:o.text.inverse,padding:"12px 24px",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"14px"},children:"Accent"})]})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px',
    maxWidth: '1200px'
  }}>
            <h1 style={{
      marginBottom: '16px'
    }}>Semantic Colors</h1>
            <p style={{
      marginBottom: '32px',
      color: '#737373',
      fontSize: '16px'
    }}>
                Intent-based color tokens for consistent usage across components. All semantic colors meet WCAG 2.1 accessibility standards
                when used as intended.
            </p>

            <SemanticColorCard title="Text Colors" colors={semantic.text} description="Colors for different text hierarchies and states" />

            <SemanticColorCard title="Background Colors" colors={semantic.background} description="Colors for various background surfaces" />

            <SemanticColorCard title="Border Colors" colors={semantic.border} description="Colors for borders and dividers" />

            <SemanticColorCard title="Interactive Colors" colors={semantic.interactive} description="Colors for interactive elements like buttons and links" />

            <SemanticColorCard title="Success Colors" colors={semantic.success} description="Colors for success states and positive feedback" />

            <SemanticColorCard title="Warning Colors" colors={semantic.warning} description="Colors for warning states and caution" />

            <SemanticColorCard title="Error Colors" colors={semantic.error} description="Colors for error states and danger" />

            <SemanticColorCard title="Info Colors" colors={semantic.info} description="Colors for informational states" />

            <SemanticColorCard title="Brand Colors" colors={semantic.brand} description="Primary and secondary brand colors" />

            <SemanticColorCard title="Surface Colors" colors={semantic.surface} description="Colors for cards, panels, and elevated surfaces" />

            <SemanticColorCard title="Shadow Colors" colors={semantic.shadow} description="Colors for shadows and depth" />
        </div>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <SemanticColorCard title="Text Colors" colors={semantic.text} description="Colors for different text hierarchies and states" />
            <div style={{
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px'
    }}>
                <h4 style={{
        marginBottom: '16px'
      }}>Examples</h4>
                <p style={{
        color: semantic.text.primary,
        marginBottom: '8px'
      }}>Primary text - Main content</p>
                <p style={{
        color: semantic.text.secondary,
        marginBottom: '8px'
      }}>Secondary text - Supporting content</p>
                <p style={{
        color: semantic.text.tertiary,
        marginBottom: '8px'
      }}>Tertiary text - Helper text</p>
                <p style={{
        color: semantic.text.disabled,
        marginBottom: '8px'
      }}>Disabled text</p>
                <div style={{
        backgroundColor: semantic.background.inverse,
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '8px'
      }}>
                    <p style={{
          color: semantic.text.inverse,
          margin: 0
        }}>Inverse text on dark background</p>
                </div>
                <a href="#" style={{
        color: semantic.text.link
      }}>
                    Link text
                </a>
            </div>
        </div>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <SemanticColorCard title="Interactive Colors" colors={semantic.interactive} description="Colors for interactive elements like buttons and links" />
            <div style={{
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px'
    }}>
                <h4 style={{
        marginBottom: '16px'
      }}>Button Examples</h4>
                <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
                    <button style={{
          backgroundColor: semantic.interactive.default,
          color: semantic.text.inverse,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
                        Default
                    </button>
                    <button style={{
          backgroundColor: semantic.interactive.hover,
          color: semantic.text.inverse,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
                        Hover
                    </button>
                    <button style={{
          backgroundColor: semantic.interactive.active,
          color: semantic.text.inverse,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
                        Active
                    </button>
                    <button style={{
          backgroundColor: semantic.interactive.disabled,
          color: semantic.text.disabled,
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'not-allowed',
          fontWeight: '500'
        }} disabled>
                        Disabled
                    </button>
                </div>
            </div>
        </div>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <h2 style={{
      marginBottom: '24px'
    }}>Status Colors</h2>

            <SemanticColorCard title="Success Colors" colors={semantic.success} description="Colors for success states and positive feedback" />

            <SemanticColorCard title="Warning Colors" colors={semantic.warning} description="Colors for warning states and caution" />

            <SemanticColorCard title="Error Colors" colors={semantic.error} description="Colors for error states and danger" />

            <SemanticColorCard title="Info Colors" colors={semantic.info} description="Colors for informational states" />

            <div style={{
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      marginTop: '24px'
    }}>
                <h4 style={{
        marginBottom: '16px'
      }}>Alert Examples</h4>
                <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
                    <div style={{
          backgroundColor: semantic.success.light,
          color: semantic.success.text,
          padding: '16px',
          borderRadius: '6px',
          borderLeft: \`4px solid \${semantic.success.default}\`
        }}>
                        <strong>Success:</strong> Operation completed successfully!
                    </div>
                    <div style={{
          backgroundColor: semantic.warning.light,
          color: semantic.warning.text,
          padding: '16px',
          borderRadius: '6px',
          borderLeft: \`4px solid \${semantic.warning.default}\`
        }}>
                        <strong>Warning:</strong> Please review this information.
                    </div>
                    <div style={{
          backgroundColor: semantic.error.light,
          color: semantic.error.text,
          padding: '16px',
          borderRadius: '6px',
          borderLeft: \`4px solid \${semantic.error.default}\`
        }}>
                        <strong>Error:</strong> Something went wrong!
                    </div>
                    <div style={{
          backgroundColor: semantic.info.light,
          color: semantic.info.text,
          padding: '16px',
          borderRadius: '6px',
          borderLeft: \`4px solid \${semantic.info.default}\`
        }}>
                        <strong>Info:</strong> Here&apos;s some helpful information.
                    </div>
                </div>
            </div>
        </div>
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px'
  }}>
            <SemanticColorCard title="Brand Colors" colors={semantic.brand} description="Primary and secondary brand colors" />
            <div style={{
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      marginTop: '24px'
    }}>
                <h4 style={{
        marginBottom: '16px'
      }}>Brand Button Examples</h4>
                <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
                    <button style={{
          backgroundColor: semantic.brand.primary,
          color: semantic.text.inverse,
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px'
        }}>
                        Primary Brand
                    </button>
                    <button style={{
          backgroundColor: semantic.brand.secondary,
          color: semantic.text.inverse,
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px'
        }}>
                        Secondary Brand
                    </button>
                    <button style={{
          backgroundColor: semantic.brand.accent,
          color: semantic.text.inverse,
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px'
        }}>
                        Accent
                    </button>
                </div>
            </div>
        </div>
}`,...a.parameters?.docs?.source}}};const C=["AllSemantic","TextColors","InteractiveColors","StatusColors","BrandColors"];export{t as AllSemantic,a as BrandColors,i as InteractiveColors,n as StatusColors,s as TextColors,C as __namedExportsOrder,b as default};
