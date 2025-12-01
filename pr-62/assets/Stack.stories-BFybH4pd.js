import{j as e}from"./iframe-DVJgsUcM.js";import{d as s,e as h,f as a,h as d,i as o,j as n,k as i,P as l,p as r,s as t}from"./lufa-ui-CX_Qt84H.js";import"./preload-helper-PPVm8Dsz.js";const I={title:"1. Components/Layout/Stack",component:i,parameters:{layout:"padded",docs:{description:{component:"A flexible layout component for stacking elements vertically or horizontally with consistent spacing. Based on CSS Flexbox."}}},tags:["autodocs"],argTypes:{gap:{control:"select",options:Object.values(n),description:"Spacing between items",table:{type:{summary:Object.values(n).join(" | ")},defaultValue:{summary:n.normal}}},direction:{control:"select",options:Object.values(o),description:"Stack direction (row or column)",table:{type:{summary:Object.values(o).join(" | ")},defaultValue:{summary:o.vertical}}},align:{control:"select",options:Object.values(d),description:"Cross-axis alignment",table:{type:{summary:Object.values(d).join(" | ")},defaultValue:{summary:d.stretch}}},justify:{control:"select",options:Object.values(a),description:"Main-axis alignment",table:{type:{summary:Object.values(a).join(" | ")},defaultValue:{summary:a.start}}},wrap:{control:"select",options:Object.values(h),description:"Whether items should wrap",table:{type:{summary:Object.values(h).join(" | ")},defaultValue:{summary:h.nowrap}}},padding:{control:"select",options:Object.values(s),description:"Internal padding",table:{type:{summary:Object.values(s).join(" | ")},defaultValue:{summary:s.none}}}}},m={args:{gap:n.normal,direction:o.vertical,align:d.stretch,justify:a.start,wrap:h.nowrap,padding:s.none},render:c=>e.jsxs(i,{...c,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})},p={render:()=>e.jsxs(i,{direction:o.vertical,gap:n.normal,children:[e.jsx(l,{color:r.blue[600],children:"First Item"}),e.jsx(l,{color:r.blue[600],children:"Second Item"}),e.jsx(l,{color:r.blue[600],children:"Third Item"})]})},g={render:()=>e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Gap: None"}),e.jsxs(i,{direction:o.horizontal,gap:n.none,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Gap: Condensed"}),e.jsxs(i,{direction:o.horizontal,gap:n.condensed,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Gap: Normal"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Gap: Spacious"}),e.jsxs(i,{direction:o.horizontal,gap:n.spacious,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})]})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"48px"},children:[e.jsxs("div",{children:[e.jsx("h2",{style:{marginBottom:"24px",fontSize:"20px",fontWeight:"bold"},children:"Horizontal Stack (cross-axis alignment)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Start (items aligned to top)"}),e.jsx("div",{style:{height:"200px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,align:d.start,children:[e.jsx(l,{color:r.blue[600],height:"small",children:"Small"}),e.jsx(l,{color:r.blue[600],height:"medium",children:"Medium"}),e.jsx(l,{color:r.blue[600],height:"large",children:"Large"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Center (items centered vertically)"}),e.jsx("div",{style:{height:"200px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,align:d.center,children:[e.jsx(l,{color:r.green[600],height:"small",children:"Small"}),e.jsx(l,{color:r.green[600],height:"medium",children:"Medium"}),e.jsx(l,{color:r.green[600],height:"large",children:"Large"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: End (items aligned to bottom)"}),e.jsx("div",{style:{height:"200px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,align:d.end,children:[e.jsx(l,{color:r.red[600],height:"small",children:"Small"}),e.jsx(l,{color:r.red[600],height:"medium",children:"Medium"}),e.jsx(l,{color:r.red[600],height:"large",children:"Large"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Stretch (items stretched to full height)"}),e.jsx("div",{style:{height:"200px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,align:d.stretch,children:[e.jsx(l,{color:r.purple[600],height:"full",children:"Stretched 1"}),e.jsx(l,{color:r.purple[600],height:"full",children:"Stretched 2"}),e.jsx(l,{color:r.purple[600],height:"full",children:"Stretched 3"})]})})]})]})]}),e.jsxs("div",{children:[e.jsx("h2",{style:{marginBottom:"24px",fontSize:"20px",fontWeight:"bold"},children:"Vertical Stack (cross-axis alignment)"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Start (items aligned to left)"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.vertical,gap:n.normal,align:d.start,children:[e.jsx(l,{color:r.blue[600],width:"small",children:"Short"}),e.jsx(l,{color:r.blue[600],width:"medium",children:"Medium Width"}),e.jsx(l,{color:r.blue[600],width:"large",children:"Very Long Width"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Center (items centered horizontally)"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.vertical,gap:n.normal,align:d.center,children:[e.jsx(l,{color:r.green[600],width:"small",children:"Short"}),e.jsx(l,{color:r.green[600],width:"medium",children:"Medium Width"}),e.jsx(l,{color:r.green[600],width:"large",children:"Very Long Width"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: End (items aligned to right)"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.vertical,gap:n.normal,align:d.end,children:[e.jsx(l,{color:r.red[600],width:"small",children:"Short"}),e.jsx(l,{color:r.red[600],width:"medium",children:"Medium Width"}),e.jsx(l,{color:r.red[600],width:"large",children:"Very Long Width"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Align: Stretch (items stretched to full width)"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.neutral[300]}`},children:e.jsxs(i,{direction:o.vertical,gap:n.normal,align:d.stretch,children:[e.jsx(l,{color:r.purple[600],width:"full",children:"Stretched Item 1"}),e.jsx(l,{color:r.purple[600],width:"full",children:"Stretched Item 2"}),e.jsx(l,{color:r.purple[600],width:"full",children:"Stretched Item 3"})]})})]})]})]})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Justify: Start"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,justify:a.start,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Justify: Center"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,justify:a.center,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Justify: End"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,justify:a.end,children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Justify: Space Between"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.none,justify:a["space-between"],children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Justify: Space Evenly"}),e.jsx("div",{style:{width:"600px",backgroundColor:t.background.secondary,padding:"16px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.none,justify:a["space-evenly"],children:[e.jsx(l,{color:r.blue[600],children:"A"}),e.jsx(l,{color:r.blue[600],children:"B"}),e.jsx(l,{color:r.blue[600],children:"C"})]})})]})]})},S={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"No Wrap (items overflow the container)"}),e.jsx("div",{style:{width:"500px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.red[400]}`,overflow:"auto"},children:e.jsx(i,{direction:o.horizontal,gap:n.normal,wrap:h.nowrap,children:[1,2,3,4,5,6,7,8].map(c=>e.jsxs(l,{color:r.red[600],width:"small",children:["Item ",c]},c))})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"With Wrap (items wrap to next line)"}),e.jsx("div",{style:{width:"500px",backgroundColor:t.background.secondary,padding:"16px",border:`2px dashed ${r.green[400]}`},children:e.jsx(i,{direction:o.horizontal,gap:n.normal,wrap:h.wrap,children:[1,2,3,4,5,6,7,8].map(c=>e.jsxs(l,{color:r.green[600],width:"small",children:["Item ",c]},c))})})]})]})},j={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"No Padding"}),e.jsx("div",{style:{backgroundColor:t.background.secondary},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,padding:s.none,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Condensed Padding"}),e.jsx("div",{style:{backgroundColor:t.background.secondary},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,padding:s.condensed,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Normal Padding"}),e.jsx("div",{style:{backgroundColor:t.background.secondary},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,padding:s.normal,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Spacious Padding"}),e.jsx("div",{style:{backgroundColor:t.background.secondary},children:e.jsxs(i,{direction:o.horizontal,gap:n.normal,padding:s.spacious,children:[e.jsx(l,{color:r.blue[600],children:"Item 1"}),e.jsx(l,{color:r.blue[600],children:"Item 2"}),e.jsx(l,{color:r.blue[600],children:"Item 3"})]})})]})]})},b={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Without grow"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(i.Item,{children:e.jsx(l,{color:r.red[600],children:"Fixed"})}),e.jsx(i.Item,{children:e.jsx(l,{color:r.blue[600],children:"Fixed"})}),e.jsx(i.Item,{children:e.jsx(l,{color:r.green[600],children:"Fixed"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"With grow on middle item"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(i.Item,{children:e.jsx(l,{color:r.red[600],children:"Fixed"})}),e.jsx(i.Item,{grow:!0,children:e.jsx(l,{color:r.blue[600],children:"Growing"})}),e.jsx(i.Item,{children:e.jsx(l,{color:r.green[600],children:"Fixed"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Multiple growing items"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(i.Item,{children:e.jsx(l,{color:r.red[600],children:"Fixed"})}),e.jsx(i.Item,{grow:!0,children:e.jsx(l,{color:r.blue[600],children:"Growing"})}),e.jsx(i.Item,{grow:!0,children:e.jsx(l,{color:r.green[600],children:"Growing"})})]})]})]})},P={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"40px",maxWidth:"800px"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Form Layout"}),e.jsxs(i,{direction:o.vertical,gap:n.normal,children:[e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(i.Item,{grow:!0,children:e.jsx(l,{color:r.indigo[600],children:"First Name"})}),e.jsx(i.Item,{grow:!0,children:e.jsx(l,{color:r.indigo[600],children:"Last Name"})})]}),e.jsx(l,{color:r.indigo[600],children:"Email"}),e.jsx(l,{color:r.indigo[600],children:"Message"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,justify:a.end,children:[e.jsx(l,{color:r.neutral[400],children:"Cancel"}),e.jsx(l,{color:r.blue[600],children:"Submit"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Navigation Bar"}),e.jsx("div",{style:{backgroundColor:r.neutral[800],borderRadius:"8px"},children:e.jsxs(i,{direction:o.horizontal,gap:n.spacious,align:d.center,justify:a["space-between"],padding:s.normal,children:[e.jsx(l,{color:r.blue[500],children:"Logo"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,children:[e.jsx(l,{color:r.neutral[500],children:"Home"}),e.jsx(l,{color:r.neutral[500],children:"About"}),e.jsx(l,{color:r.neutral[500],children:"Contact"})]}),e.jsx(l,{color:r.green[500],children:"Sign In"})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Card Grid"}),e.jsx(i,{direction:o.horizontal,gap:n.normal,wrap:h.wrap,children:[1,2,3,4,5,6].map(c=>e.jsx("div",{style:{flex:"1 1 200px"},children:e.jsxs(l,{color:r.purple[600],children:["Card ",c]})},c))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"16px"},children:"Dashboard Layout"}),e.jsxs(i,{direction:o.horizontal,gap:n.normal,align:d.stretch,children:[e.jsx(i.Item,{children:e.jsx("div",{style:{height:"200px"},children:e.jsx(l,{color:r.neutral[600],height:"full",children:"Sidebar"})})}),e.jsx(i.Item,{grow:!0,children:e.jsxs(i,{direction:o.vertical,gap:n.normal,children:[e.jsx(l,{color:r.blue[600],children:"Header"}),e.jsx("div",{style:{height:"140px"},children:e.jsx(l,{color:r.indigo[600],height:"full",children:"Main Content"})})]})})]})]})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    gap: STACK_GAP.normal,
    direction: STACK_DIRECTION.vertical,
    align: STACK_ALIGN.stretch,
    justify: STACK_JUSTIFY.start,
    wrap: STACK_WRAP.nowrap,
    padding: STACK_PADDING.none
  },
  render: (args: React.ComponentProps<typeof Stack>) => <Stack {...args}>
            <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
        </Stack>
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
            <Placeholder color={primitives.blue[600]}>First Item</Placeholder>
            <Placeholder color={primitives.blue[600]}>Second Item</Placeholder>
            <Placeholder color={primitives.blue[600]}>Third Item</Placeholder>
        </Stack>
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
            <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
            <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
        </Stack>
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Gap: None</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Gap: Condensed</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Gap: Normal</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Gap: Spacious</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.spacious}>
                    <Placeholder color={primitives.blue[600]}>A</Placeholder>
                    <Placeholder color={primitives.blue[600]}>B</Placeholder>
                    <Placeholder color={primitives.blue[600]}>C</Placeholder>
                </Stack>
            </div>
        </div>
}`,...x.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '48px'
  }}>
            <div>
                <h2 style={{
        marginBottom: '24px',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>Horizontal Stack (cross-axis alignment)</h2>
                <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Start (items aligned to top)</h3>
                        <div style={{
            height: '200px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                                <Placeholder color={primitives.blue[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Center (items centered vertically)</h3>
                        <div style={{
            height: '200px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                                <Placeholder color={primitives.green[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: End (items aligned to bottom)</h3>
                        <div style={{
            height: '200px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                                <Placeholder color={primitives.red[600]} height="small">
                                    Small
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} height="medium">
                                    Medium
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} height="large">
                                    Large
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Stretch (items stretched to full height)</h3>
                        <div style={{
            height: '200px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 1
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 2
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} height="full">
                                    Stretched 3
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 style={{
        marginBottom: '24px',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>Vertical Stack (cross-axis alignment)</h2>
                <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Start (items aligned to left)</h3>
                        <div style={{
            width: '600px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                                <Placeholder color={primitives.blue[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.blue[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Center (items centered horizontally)</h3>
                        <div style={{
            width: '600px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                                <Placeholder color={primitives.green[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.green[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: End (items aligned to right)</h3>
                        <div style={{
            width: '600px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                                <Placeholder color={primitives.red[600]} width="small">
                                    Short
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} width="medium">
                                    Medium Width
                                </Placeholder>
                                <Placeholder color={primitives.red[600]} width="large">
                                    Very Long Width
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <h3 style={{
            marginBottom: '16px'
          }}>Align: Stretch (items stretched to full width)</h3>
                        <div style={{
            width: '600px',
            backgroundColor: semantic.background.secondary,
            padding: '16px',
            border: \`2px dashed \${primitives.neutral[300]}\`
          }}>
                            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 1
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 2
                                </Placeholder>
                                <Placeholder color={primitives.purple[600]} width="full">
                                    Stretched Item 3
                                </Placeholder>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Justify: Start</h3>
                <div style={{
        width: '600px',
        backgroundColor: semantic.background.secondary,
        padding: '16px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.start}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Justify: Center</h3>
                <div style={{
        width: '600px',
        backgroundColor: semantic.background.secondary,
        padding: '16px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.center}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Justify: End</h3>
                <div style={{
        width: '600px',
        backgroundColor: semantic.background.secondary,
        padding: '16px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Justify: Space Between</h3>
                <div style={{
        width: '600px',
        backgroundColor: semantic.background.secondary,
        padding: '16px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-between']}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Justify: Space Evenly</h3>
                <div style={{
        width: '600px',
        backgroundColor: semantic.background.secondary,
        padding: '16px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-evenly']}>
                        <Placeholder color={primitives.blue[600]}>A</Placeholder>
                        <Placeholder color={primitives.blue[600]}>B</Placeholder>
                        <Placeholder color={primitives.blue[600]}>C</Placeholder>
                    </Stack>
                </div>
            </div>
        </div>
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>No Wrap (items overflow the container)</h3>
                <div style={{
        width: '500px',
        backgroundColor: semantic.background.secondary,
        padding: '16px',
        border: \`2px dashed \${primitives.red[400]}\`,
        overflow: 'auto'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.nowrap}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <Placeholder key={n} color={primitives.red[600]} width="small">
                                Item {n}
                            </Placeholder>)}
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>With Wrap (items wrap to next line)</h3>
                <div style={{
        width: '500px',
        backgroundColor: semantic.background.secondary,
        padding: '16px',
        border: \`2px dashed \${primitives.green[400]}\`
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <Placeholder key={n} color={primitives.green[600]} width="small">
                                Item {n}
                            </Placeholder>)}
                    </Stack>
                </div>
            </div>
        </div>
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>No Padding</h3>
                <div style={{
        backgroundColor: semantic.background.secondary
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.none}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Condensed Padding</h3>
                <div style={{
        backgroundColor: semantic.background.secondary
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.condensed}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Normal Padding</h3>
                <div style={{
        backgroundColor: semantic.background.secondary
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.normal}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Spacious Padding</h3>
                <div style={{
        backgroundColor: semantic.background.secondary
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.spacious}>
                        <Placeholder color={primitives.blue[600]}>Item 1</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 2</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Item 3</Placeholder>
                    </Stack>
                </div>
            </div>
        </div>
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Without grow</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.blue[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.green[600]}>Fixed</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>

            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>With grow on middle item</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.blue[600]}>Growing</Placeholder>
                    </Stack.Item>
                    <Stack.Item>
                        <Placeholder color={primitives.green[600]}>Fixed</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>

            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Multiple growing items</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                    <Stack.Item>
                        <Placeholder color={primitives.red[600]}>Fixed</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.blue[600]}>Growing</Placeholder>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Placeholder color={primitives.green[600]}>Growing</Placeholder>
                    </Stack.Item>
                </Stack>
            </div>
        </div>
}`,...b.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    maxWidth: '800px'
  }}>
            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Form Layout</h3>
                <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                        <Stack.Item grow>
                            <Placeholder color={primitives.indigo[600]}>First Name</Placeholder>
                        </Stack.Item>
                        <Stack.Item grow>
                            <Placeholder color={primitives.indigo[600]}>Last Name</Placeholder>
                        </Stack.Item>
                    </Stack>
                    <Placeholder color={primitives.indigo[600]}>Email</Placeholder>
                    <Placeholder color={primitives.indigo[600]}>Message</Placeholder>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
                        <Placeholder color={primitives.neutral[400]}>Cancel</Placeholder>
                        <Placeholder color={primitives.blue[600]}>Submit</Placeholder>
                    </Stack>
                </Stack>
            </div>

            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Navigation Bar</h3>
                <div style={{
        backgroundColor: primitives.neutral[800],
        borderRadius: '8px'
      }}>
                    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.spacious} align={STACK_ALIGN.center} justify={STACK_JUSTIFY['space-between']} padding={STACK_PADDING.normal}>
                        <Placeholder color={primitives.blue[500]}>Logo</Placeholder>
                        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
                            <Placeholder color={primitives.neutral[500]}>Home</Placeholder>
                            <Placeholder color={primitives.neutral[500]}>About</Placeholder>
                            <Placeholder color={primitives.neutral[500]}>Contact</Placeholder>
                        </Stack>
                        <Placeholder color={primitives.green[500]}>Sign In</Placeholder>
                    </Stack>
                </div>
            </div>

            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Card Grid</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
                    {[1, 2, 3, 4, 5, 6].map(n => <div key={n} style={{
          flex: '1 1 200px'
        }}>
                            <Placeholder color={primitives.purple[600]}>Card {n}</Placeholder>
                        </div>)}
                </Stack>
            </div>

            <div>
                <h3 style={{
        marginBottom: '16px'
      }}>Dashboard Layout</h3>
                <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                    <Stack.Item>
                        <div style={{
            height: '200px'
          }}>
                            <Placeholder color={primitives.neutral[600]} height="full">
                                Sidebar
                            </Placeholder>
                        </div>
                    </Stack.Item>
                    <Stack.Item grow>
                        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
                            <Placeholder color={primitives.blue[600]}>Header</Placeholder>
                            <div style={{
              height: '140px'
            }}>
                                <Placeholder color={primitives.indigo[600]} height="full">
                                    Main Content
                                </Placeholder>
                            </div>
                        </Stack>
                    </Stack.Item>
                </Stack>
            </div>
        </div>
}`,...P.parameters?.docs?.source}}};const k=["Default","VerticalStack","HorizontalStack","GapVariants","Alignment","Justification","WithWrap","WithPadding","StackItem","RealWorldExamples"];export{u as Alignment,m as Default,x as GapVariants,g as HorizontalStack,v as Justification,P as RealWorldExamples,b as StackItem,p as VerticalStack,j as WithPadding,S as WithWrap,k as __namedExportsOrder,I as default};
