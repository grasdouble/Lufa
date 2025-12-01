import{T as l}from"./lufa-ui-CZNmcjrL.js";const s={title:"2. OLD/Page Sections/Testimonial",component:l,parameters:{layout:"centered"},tags:[""],argTypes:{style:{control:"select",description:"The style of the testimonial",options:[1,2,3]},imgUrl:{control:"select",options:["https://images.unsplash.com/photo-1517841905240-472988babdf9","https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80"],description:"The image url"},testimonial:{control:"text",description:"The testimonial"},from:{control:"text",description:"The name of the person"},position:{control:"text",description:"The position of the person"}}},i=o=>({...s.argTypes,style:{control:"select",description:"The style of the testimonial",options:[o]}}),t={args:{style:1,imgUrl:"https://images.unsplash.com/photo-1517841905240-472988babdf9",testimonial:"Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",from:"Judith Black",position:"CEO of Workcation"}},a={argTypes:i(2),args:{style:2,imgUrl:"https://images.unsplash.com/photo-1517841905240-472988babdf9",testimonial:"Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",from:"Judith Black",position:"CEO of Workcation"}},e={argTypes:i(3),args:{style:3,imgUrl:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80",testimonial:"Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.",from:"Judith Black",position:"CEO of Workcation"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    style: 1,
    imgUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    testimonial: 'Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.',
    from: 'Judith Black',
    position: 'CEO of Workcation'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  argTypes: artTypesWithSpecificStype(2),
  args: {
    style: 2,
    imgUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    testimonial: 'Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.',
    from: 'Judith Black',
    position: 'CEO of Workcation'
  }
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  argTypes: artTypesWithSpecificStype(3),
  args: {
    style: 3,
    imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80',
    testimonial: 'Sed placerat ullamcorper lacus non feugiat. Nulla bibendum lectus at mattis tristique. Nulla placerat sit amet nibh quis accumsan. In molestie volutpat luctus. Quisque accumsan sit amet justo vel ultrices. Nulla facilisi.',
    from: 'Judith Black',
    position: 'CEO of Workcation'
  }
}`,...e.parameters?.docs?.source}}};const c=["Primary","Secondary","Tertiary"],u=Object.freeze(Object.defineProperty({__proto__:null,Primary:t,Secondary:a,Tertiary:e,__namedExportsOrder:c,default:s},Symbol.toStringTag,{value:"Module"}));export{t as P,a as S,u as T,e as a};
