import{j as e,r as m}from"./iframe-9sJc_ofn.js";import{g as A,m as a,a as F,b as c,W as d,c as b}from"./lufa-ui-CZNmcjrL.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"0. Design System/Colors/Accessibility",parameters:{layout:"padded"},tags:["autodocs"]},l={render:()=>{const[o,n]=m.useState("#2563EB"),[t,r]=m.useState("#FFFFFF"),s=A(o,t),u=a(o,t,"AA"),y=a(o,t,"AAA"),h=a(o,t,"AA",!0),v=a(o,t,"AAA",!0),f=F(s);return e.jsxs("div",{style:{padding:"20px",maxWidth:"800px"},children:[e.jsx("h1",{style:{marginBottom:"16px"},children:"Contrast Ratio Checker"}),e.jsx("p",{style:{marginBottom:"32px",color:"#737373"},children:"Check if your color combinations meet WCAG 2.1 accessibility standards."}),e.jsxs("div",{style:{display:"flex",gap:"24px",marginBottom:"32px",flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600"},children:"Foreground Color"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("input",{type:"color",value:o,onChange:i=>n(i.target.value),style:{width:"60px",height:"40px",cursor:"pointer"}}),e.jsx("input",{type:"text",value:o,onChange:i=>n(i.target.value),style:{padding:"8px 12px",border:"1px solid #D4D4D4",borderRadius:"6px",fontFamily:"monospace",width:"120px"}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600"},children:"Background Color"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("input",{type:"color",value:t,onChange:i=>r(i.target.value),style:{width:"60px",height:"40px",cursor:"pointer"}}),e.jsx("input",{type:"text",value:t,onChange:i=>r(i.target.value),style:{padding:"8px 12px",border:"1px solid #D4D4D4",borderRadius:"6px",fontFamily:"monospace",width:"120px"}})]})]})]}),e.jsxs("div",{style:{backgroundColor:t,padding:"40px",borderRadius:"12px",border:"1px solid #E5E5E5",marginBottom:"32px"},children:[e.jsx("h2",{style:{color:o,marginBottom:"16px"},children:"Preview Heading"}),e.jsx("p",{style:{color:o,fontSize:"16px",marginBottom:"12px"},children:"This is regular text at 16px. It needs a contrast ratio of at least 4.5:1 for WCAG AA or 7:1 for WCAG AAA."}),e.jsx("p",{style:{color:o,fontSize:"24px",fontWeight:"600"},children:"This is large text at 24px bold. It needs 3:1 for AA or 4.5:1 for AAA."})]}),e.jsxs("div",{style:{padding:"24px",backgroundColor:"#F5F5F5",borderRadius:"12px",marginBottom:"24px"},children:[e.jsx("h3",{style:{marginBottom:"16px",fontSize:"18px"},children:"Results"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"24px"},children:[e.jsxs("div",{style:{padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{style:{fontSize:"32px",fontWeight:"700",marginBottom:"4px"},children:[s.toFixed(2),":1"]}),e.jsx("div",{style:{color:"#737373",fontSize:"14px"},children:"Contrast Ratio"})]}),e.jsxs("div",{style:{padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsx("div",{style:{fontSize:"24px",fontWeight:"700",marginBottom:"4px"},children:f}),e.jsx("div",{style:{color:"#737373",fontSize:"14px"},children:"Level"})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"12px",backgroundColor:"#FFFFFF",borderRadius:"6px"},children:[e.jsx("span",{children:"WCAG AA (Normal Text - 4.5:1)"}),e.jsx("span",{style:{fontWeight:"600",color:u?"#16A34A":"#DC2626"},children:u?"✓ Pass":"✗ Fail"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"12px",backgroundColor:"#FFFFFF",borderRadius:"6px"},children:[e.jsx("span",{children:"WCAG AAA (Normal Text - 7:1)"}),e.jsx("span",{style:{fontWeight:"600",color:y?"#16A34A":"#DC2626"},children:y?"✓ Pass":"✗ Fail"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"12px",backgroundColor:"#FFFFFF",borderRadius:"6px"},children:[e.jsx("span",{children:"WCAG AA (Large Text - 3:1)"}),e.jsx("span",{style:{fontWeight:"600",color:h?"#16A34A":"#DC2626"},children:h?"✓ Pass":"✗ Fail"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"12px",backgroundColor:"#FFFFFF",borderRadius:"6px"},children:[e.jsx("span",{children:"WCAG AAA (Large Text - 4.5:1)"}),e.jsx("span",{style:{fontWeight:"600",color:v?"#16A34A":"#DC2626"},children:v?"✓ Pass":"✗ Fail"})]})]})]}),e.jsxs("div",{style:{padding:"16px",backgroundColor:"#EFF6FF",borderRadius:"8px",borderLeft:"4px solid #2563EB"},children:[e.jsx("strong",{children:"Tip:"})," Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) or larger when bold."]})]})}},p={render:()=>e.jsxs("div",{style:{padding:"20px",maxWidth:"1200px"},children:[e.jsx("h1",{style:{marginBottom:"16px"},children:"Pre-verified Accessible Color Pairs"}),e.jsx("p",{style:{marginBottom:"32px",color:"#737373"},children:"These color combinations have been tested and meet WCAG AAA standards (7:1 contrast ratio)."}),e.jsx("h2",{style:{marginBottom:"16px",fontSize:"20px"},children:"High Contrast Pairs"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"16px",marginBottom:"40px"},children:c.accessiblePairs.highContrast.map((o,n)=>e.jsxs("div",{style:{backgroundColor:o.background,padding:"24px",borderRadius:"8px",border:"1px solid #E5E5E5"},children:[e.jsx("p",{style:{color:o.foreground,margin:"0 0 12px 0",fontSize:"16px"},children:"Sample text content"}),e.jsxs("div",{style:{fontSize:"12px",color:"#737373"},children:[e.jsxs("div",{children:["Foreground: ",o.foreground]}),e.jsxs("div",{children:["Background: ",o.background]}),e.jsxs("div",{style:{marginTop:"8px",color:"#16A34A",fontWeight:"600"},children:["Ratio: ",o.ratio,":1 - AAA"]})]})]},n))}),e.jsx("h2",{style:{marginBottom:"16px",fontSize:"20px"},children:"Brand Color Pairs"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"16px",marginBottom:"40px"},children:c.accessiblePairs.brand.map((o,n)=>e.jsxs("div",{style:{backgroundColor:o.background,padding:"24px",borderRadius:"8px",border:"1px solid #E5E5E5"},children:[e.jsx("p",{style:{color:o.foreground,margin:"0 0 12px 0",fontSize:"16px"},children:"Sample text content"}),e.jsxs("div",{style:{fontSize:"12px",color:o.foreground==="#FFFFFF"?"#E5E5E5":"#737373"},children:[e.jsxs("div",{children:["Foreground: ",o.foreground]}),e.jsxs("div",{children:["Background: ",o.background]}),e.jsxs("div",{style:{marginTop:"8px",color:"#16A34A",fontWeight:"600"},children:["Ratio: ",o.ratio,":1 - AAA"]})]})]},n))}),e.jsx("h2",{style:{marginBottom:"16px",fontSize:"20px"},children:"Status Color Pairs"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"16px"},children:c.accessiblePairs.status.map((o,n)=>e.jsxs("div",{style:{backgroundColor:o.background,padding:"24px",borderRadius:"8px",border:"1px solid #E5E5E5"},children:[e.jsx("p",{style:{color:o.foreground,margin:"0 0 12px 0",fontSize:"16px"},children:"Sample text content"}),e.jsxs("div",{style:{fontSize:"12px",color:"#737373"},children:[e.jsxs("div",{children:["Foreground: ",o.foreground]}),e.jsxs("div",{children:["Background: ",o.background]}),e.jsxs("div",{style:{marginTop:"8px",color:"#16A34A",fontWeight:"600"},children:["Ratio: ",o.ratio,":1 - AAA"]})]})]},n))})]})},x={render:()=>e.jsxs("div",{style:{padding:"20px",maxWidth:"800px"},children:[e.jsx("h1",{style:{marginBottom:"16px"},children:"WCAG 2.1 Standards"}),e.jsx("p",{style:{marginBottom:"32px",color:"#737373"},children:"Understanding the contrast ratio requirements for different compliance levels."}),e.jsxs("div",{style:{padding:"24px",backgroundColor:"#F5F5F5",borderRadius:"12px",marginBottom:"24px"},children:[e.jsx("h2",{style:{marginBottom:"16px",fontSize:"20px"},children:"Level AA (Minimum)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:"Normal Text"}),e.jsx("div",{style:{fontSize:"14px",color:"#737373"},children:"14pt or smaller (under 18.66px)"})]}),e.jsxs("div",{style:{fontSize:"24px",fontWeight:"700",color:"#2563EB"},children:[d.AA.normalText,":1"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:"Large Text"}),e.jsx("div",{style:{fontSize:"14px",color:"#737373"},children:"18pt+ (24px+) or 14pt+ bold (18.66px+)"})]}),e.jsxs("div",{style:{fontSize:"24px",fontWeight:"700",color:"#2563EB"},children:[d.AA.largeText,":1"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:"UI Components"}),e.jsx("div",{style:{fontSize:"14px",color:"#737373"},children:"Graphical objects and controls"})]}),e.jsxs("div",{style:{fontSize:"24px",fontWeight:"700",color:"#2563EB"},children:[d.AA.uiComponents,":1"]})]})]})]}),e.jsxs("div",{style:{padding:"24px",backgroundColor:"#F0FDF4",borderRadius:"12px",marginBottom:"24px"},children:[e.jsx("h2",{style:{marginBottom:"16px",fontSize:"20px"},children:"Level AAA (Enhanced)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:"Normal Text"}),e.jsx("div",{style:{fontSize:"14px",color:"#737373"},children:"14pt or smaller (under 18.66px)"})]}),e.jsxs("div",{style:{fontSize:"24px",fontWeight:"700",color:"#16A34A"},children:[d.AAA.normalText,":1"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"16px",backgroundColor:"#FFFFFF",borderRadius:"8px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:"Large Text"}),e.jsx("div",{style:{fontSize:"14px",color:"#737373"},children:"18pt+ (24px+) or 14pt+ bold (18.66px+)"})]}),e.jsxs("div",{style:{fontSize:"24px",fontWeight:"700",color:"#16A34A"},children:[d.AAA.largeText,":1"]})]})]})]}),e.jsxs("div",{style:{padding:"16px",backgroundColor:"#EFF6FF",borderRadius:"8px",borderLeft:"4px solid #2563EB"},children:[e.jsx("strong",{children:"Note:"})," The Lufa Design System aims for AAA compliance wherever possible. All semantic color tokens with shade 600+ meet AAA standards for normal text on white backgrounds."]})]})},g={render:()=>{const[o,n]=m.useState("#2563EB"),t=b(o),r=A(t,o);return e.jsxs("div",{style:{padding:"20px",maxWidth:"600px"},children:[e.jsx("h1",{style:{marginBottom:"16px"},children:"Text Color Suggestion"}),e.jsx("p",{style:{marginBottom:"32px",color:"#737373"},children:"Automatically suggests the best text color (black or white) for any background color."}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600"},children:"Choose Background Color"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("input",{type:"color",value:o,onChange:s=>n(s.target.value),style:{width:"60px",height:"40px",cursor:"pointer"}}),e.jsx("input",{type:"text",value:o,onChange:s=>n(s.target.value),style:{padding:"8px 12px",border:"1px solid #D4D4D4",borderRadius:"6px",fontFamily:"monospace",width:"120px"}})]})]}),e.jsxs("div",{style:{backgroundColor:o,padding:"40px",borderRadius:"12px",marginBottom:"24px",border:"1px solid #E5E5E5"},children:[e.jsx("h2",{style:{color:t,marginBottom:"12px"},children:"Suggested Text Color"}),e.jsx("p",{style:{color:t,fontSize:"16px"},children:"This text uses the automatically suggested color for optimal readability. The system chooses between black and white text based on the background luminance."})]}),e.jsxs("div",{style:{padding:"20px",backgroundColor:"#F5F5F5",borderRadius:"8px"},children:[e.jsxs("div",{style:{marginBottom:"16px"},children:[e.jsx("strong",{children:"Suggested Text Color:"}),e.jsx("code",{style:{marginLeft:"8px",padding:"4px 8px",backgroundColor:"#FFFFFF",borderRadius:"4px",fontFamily:"monospace"},children:t})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Contrast Ratio:"}),e.jsxs("span",{style:{marginLeft:"8px",color:r>=7?"#16A34A":r>=4.5?"#EA580C":"#DC2626",fontWeight:"600"},children:[r.toFixed(2),":1 (",r>=7?"AAA":r>=4.5?"AA":"Fail",")"]})]})]})]})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [foreground, setForeground] = useState('#2563EB');
    const [background, setBackground] = useState('#FFFFFF');
    const ratio = getContrastRatio(foreground, background);
    const meetsAA = meetsWCAG(foreground, background, 'AA');
    const meetsAAA = meetsWCAG(foreground, background, 'AAA');
    const meetsAALarge = meetsWCAG(foreground, background, 'AA', true);
    const meetsAAALarge = meetsWCAG(foreground, background, 'AAA', true);
    const level = getContrastLevel(ratio);
    return <div style={{
      padding: '20px',
      maxWidth: '800px'
    }}>
                <h1 style={{
        marginBottom: '16px'
      }}>Contrast Ratio Checker</h1>
                <p style={{
        marginBottom: '32px',
        color: '#737373'
      }}>
                    Check if your color combinations meet WCAG 2.1 accessibility standards.
                </p>

                <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
                    <div>
                        <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600'
          }}>Foreground Color</label>
                        <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
                            <input type="color" value={foreground} onChange={e => setForeground(e.target.value)} style={{
              width: '60px',
              height: '40px',
              cursor: 'pointer'
            }} />
                            <input type="text" value={foreground} onChange={e => setForeground(e.target.value)} style={{
              padding: '8px 12px',
              border: '1px solid #D4D4D4',
              borderRadius: '6px',
              fontFamily: 'monospace',
              width: '120px'
            }} />
                        </div>
                    </div>

                    <div>
                        <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600'
          }}>Background Color</label>
                        <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
                            <input type="color" value={background} onChange={e => setBackground(e.target.value)} style={{
              width: '60px',
              height: '40px',
              cursor: 'pointer'
            }} />
                            <input type="text" value={background} onChange={e => setBackground(e.target.value)} style={{
              padding: '8px 12px',
              border: '1px solid #D4D4D4',
              borderRadius: '6px',
              fontFamily: 'monospace',
              width: '120px'
            }} />
                        </div>
                    </div>
                </div>

                <div style={{
        backgroundColor: background,
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid #E5E5E5',
        marginBottom: '32px'
      }}>
                    <h2 style={{
          color: foreground,
          marginBottom: '16px'
        }}>Preview Heading</h2>
                    <p style={{
          color: foreground,
          fontSize: '16px',
          marginBottom: '12px'
        }}>
                        This is regular text at 16px. It needs a contrast ratio of at least 4.5:1 for WCAG AA or 7:1 for WCAG AAA.
                    </p>
                    <p style={{
          color: foreground,
          fontSize: '24px',
          fontWeight: '600'
        }}>
                        This is large text at 24px bold. It needs 3:1 for AA or 4.5:1 for AAA.
                    </p>
                </div>

                <div style={{
        padding: '24px',
        backgroundColor: '#F5F5F5',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
                    <h3 style={{
          marginBottom: '16px',
          fontSize: '18px'
        }}>Results</h3>

                    <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px'
        }}>
                        <div style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px'
          }}>
                            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '4px'
            }}>{ratio.toFixed(2)}:1</div>
                            <div style={{
              color: '#737373',
              fontSize: '14px'
            }}>Contrast Ratio</div>
                        </div>

                        <div style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px'
          }}>
                            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '4px'
            }}>{level}</div>
                            <div style={{
              color: '#737373',
              fontSize: '14px'
            }}>Level</div>
                        </div>
                    </div>

                    <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
                        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px'
          }}>
                            <span>WCAG AA (Normal Text - 4.5:1)</span>
                            <span style={{
              fontWeight: '600',
              color: meetsAA ? '#16A34A' : '#DC2626'
            }}>
                                {meetsAA ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px'
          }}>
                            <span>WCAG AAA (Normal Text - 7:1)</span>
                            <span style={{
              fontWeight: '600',
              color: meetsAAA ? '#16A34A' : '#DC2626'
            }}>
                                {meetsAAA ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px'
          }}>
                            <span>WCAG AA (Large Text - 3:1)</span>
                            <span style={{
              fontWeight: '600',
              color: meetsAALarge ? '#16A34A' : '#DC2626'
            }}>
                                {meetsAALarge ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>

                        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px'
          }}>
                            <span>WCAG AAA (Large Text - 4.5:1)</span>
                            <span style={{
              fontWeight: '600',
              color: meetsAAALarge ? '#16A34A' : '#DC2626'
            }}>
                                {meetsAAALarge ? '✓ Pass' : '✗ Fail'}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{
        padding: '16px',
        backgroundColor: '#EFF6FF',
        borderRadius: '8px',
        borderLeft: '4px solid #2563EB'
      }}>
                    <strong>Tip:</strong> Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) or larger when bold.
                </div>
            </div>;
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px',
    maxWidth: '1200px'
  }}>
            <h1 style={{
      marginBottom: '16px'
    }}>Pre-verified Accessible Color Pairs</h1>
            <p style={{
      marginBottom: '32px',
      color: '#737373'
    }}>
                These color combinations have been tested and meet WCAG AAA standards (7:1 contrast ratio).
            </p>

            <h2 style={{
      marginBottom: '16px',
      fontSize: '20px'
    }}>High Contrast Pairs</h2>
            <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
      marginBottom: '40px'
    }}>
                {accessibility.accessiblePairs.highContrast.map((pair: ColorPair, idx: number) => <div key={idx} style={{
        backgroundColor: pair.background,
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
      }}>
                        <p style={{
          color: pair.foreground,
          margin: '0 0 12px 0',
          fontSize: '16px'
        }}>Sample text content</p>
                        <div style={{
          fontSize: '12px',
          color: '#737373'
        }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{
            marginTop: '8px',
            color: '#16A34A',
            fontWeight: '600'
          }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>)}
            </div>

            <h2 style={{
      marginBottom: '16px',
      fontSize: '20px'
    }}>Brand Color Pairs</h2>
            <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
      marginBottom: '40px'
    }}>
                {accessibility.accessiblePairs.brand.map((pair: ColorPair, idx: number) => <div key={idx} style={{
        backgroundColor: pair.background,
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
      }}>
                        <p style={{
          color: pair.foreground,
          margin: '0 0 12px 0',
          fontSize: '16px'
        }}>Sample text content</p>
                        <div style={{
          fontSize: '12px',
          color: pair.foreground === '#FFFFFF' ? '#E5E5E5' : '#737373'
        }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{
            marginTop: '8px',
            color: '#16A34A',
            fontWeight: '600'
          }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>)}
            </div>

            <h2 style={{
      marginBottom: '16px',
      fontSize: '20px'
    }}>Status Color Pairs</h2>
            <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px'
    }}>
                {accessibility.accessiblePairs.status.map((pair: ColorPair, idx: number) => <div key={idx} style={{
        backgroundColor: pair.background,
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
      }}>
                        <p style={{
          color: pair.foreground,
          margin: '0 0 12px 0',
          fontSize: '16px'
        }}>Sample text content</p>
                        <div style={{
          fontSize: '12px',
          color: '#737373'
        }}>
                            <div>Foreground: {pair.foreground}</div>
                            <div>Background: {pair.background}</div>
                            <div style={{
            marginTop: '8px',
            color: '#16A34A',
            fontWeight: '600'
          }}>Ratio: {pair.ratio}:1 - AAA</div>
                        </div>
                    </div>)}
            </div>
        </div>
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '20px',
    maxWidth: '800px'
  }}>
            <h1 style={{
      marginBottom: '16px'
    }}>WCAG 2.1 Standards</h1>
            <p style={{
      marginBottom: '32px',
      color: '#737373'
    }}>
                Understanding the contrast ratio requirements for different compliance levels.
            </p>

            <div style={{
      padding: '24px',
      backgroundColor: '#F5F5F5',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
                <h2 style={{
        marginBottom: '16px',
        fontSize: '20px'
      }}>Level AA (Minimum)</h2>
                <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
                    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
                        <div>
                            <div style={{
              fontWeight: '600',
              marginBottom: '4px'
            }}>Normal Text</div>
                            <div style={{
              fontSize: '14px',
              color: '#737373'
            }}>14pt or smaller (under 18.66px)</div>
                        </div>
                        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2563EB'
          }}>{WCAG_STANDARDS.AA.normalText}:1</div>
                    </div>

                    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
                        <div>
                            <div style={{
              fontWeight: '600',
              marginBottom: '4px'
            }}>Large Text</div>
                            <div style={{
              fontSize: '14px',
              color: '#737373'
            }}>18pt+ (24px+) or 14pt+ bold (18.66px+)</div>
                        </div>
                        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2563EB'
          }}>{WCAG_STANDARDS.AA.largeText}:1</div>
                    </div>

                    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
                        <div>
                            <div style={{
              fontWeight: '600',
              marginBottom: '4px'
            }}>UI Components</div>
                            <div style={{
              fontSize: '14px',
              color: '#737373'
            }}>Graphical objects and controls</div>
                        </div>
                        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2563EB'
          }}>{WCAG_STANDARDS.AA.uiComponents}:1</div>
                    </div>
                </div>
            </div>

            <div style={{
      padding: '24px',
      backgroundColor: '#F0FDF4',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
                <h2 style={{
        marginBottom: '16px',
        fontSize: '20px'
      }}>Level AAA (Enhanced)</h2>
                <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
                    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
                        <div>
                            <div style={{
              fontWeight: '600',
              marginBottom: '4px'
            }}>Normal Text</div>
                            <div style={{
              fontSize: '14px',
              color: '#737373'
            }}>14pt or smaller (under 18.66px)</div>
                        </div>
                        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#16A34A'
          }}>{WCAG_STANDARDS.AAA.normalText}:1</div>
                    </div>

                    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px'
        }}>
                        <div>
                            <div style={{
              fontWeight: '600',
              marginBottom: '4px'
            }}>Large Text</div>
                            <div style={{
              fontSize: '14px',
              color: '#737373'
            }}>18pt+ (24px+) or 14pt+ bold (18.66px+)</div>
                        </div>
                        <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#16A34A'
          }}>{WCAG_STANDARDS.AAA.largeText}:1</div>
                    </div>
                </div>
            </div>

            <div style={{
      padding: '16px',
      backgroundColor: '#EFF6FF',
      borderRadius: '8px',
      borderLeft: '4px solid #2563EB'
    }}>
                <strong>Note:</strong> The Lufa Design System aims for AAA compliance wherever possible. All semantic color tokens with
                shade 600+ meet AAA standards for normal text on white backgrounds.
            </div>
        </div>
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [bgColor, setBgColor] = useState('#2563EB');
    const suggestedTextColor = getSuggestedTextColor(bgColor);
    const ratio = getContrastRatio(suggestedTextColor, bgColor);
    return <div style={{
      padding: '20px',
      maxWidth: '600px'
    }}>
                <h1 style={{
        marginBottom: '16px'
      }}>Text Color Suggestion</h1>
                <p style={{
        marginBottom: '32px',
        color: '#737373'
      }}>
                    Automatically suggests the best text color (black or white) for any background color.
                </p>

                <div style={{
        marginBottom: '24px'
      }}>
                    <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '600'
        }}>Choose Background Color</label>
                    <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{
            width: '60px',
            height: '40px',
            cursor: 'pointer'
          }} />
                        <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{
            padding: '8px 12px',
            border: '1px solid #D4D4D4',
            borderRadius: '6px',
            fontFamily: 'monospace',
            width: '120px'
          }} />
                    </div>
                </div>

                <div style={{
        backgroundColor: bgColor,
        padding: '40px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '1px solid #E5E5E5'
      }}>
                    <h2 style={{
          color: suggestedTextColor,
          marginBottom: '12px'
        }}>Suggested Text Color</h2>
                    <p style={{
          color: suggestedTextColor,
          fontSize: '16px'
        }}>
                        This text uses the automatically suggested color for optimal readability. The system chooses between black and white
                        text based on the background luminance.
                    </p>
                </div>

                <div style={{
        padding: '20px',
        backgroundColor: '#F5F5F5',
        borderRadius: '8px'
      }}>
                    <div style={{
          marginBottom: '16px'
        }}>
                        <strong>Suggested Text Color:</strong>
                        <code style={{
            marginLeft: '8px',
            padding: '4px 8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
                            {suggestedTextColor}
                        </code>
                    </div>
                    <div>
                        <strong>Contrast Ratio:</strong>
                        <span style={{
            marginLeft: '8px',
            color: ratio >= 7 ? '#16A34A' : ratio >= 4.5 ? '#EA580C' : '#DC2626',
            fontWeight: '600'
          }}>
                            {ratio.toFixed(2)}:1 ({ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'})
                        </span>
                    </div>
                </div>
            </div>;
  }
}`,...g.parameters?.docs?.source}}};const S=["ContrastChecker","AccessiblePairs","WCAGStandards","TextColorSuggestion"];export{p as AccessiblePairs,l as ContrastChecker,g as TextColorSuggestion,x as WCAGStandards,S as __namedExportsOrder,k as default};
