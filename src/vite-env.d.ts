/// <reference types="vite/client" />

// Other file types that TS can't resolve module for

declare module '*.yaml' {
  const data: any
  export default data
}

declare module '*.csv' {
  const data: any
  export default data
}

declare module 'chart.xkcd'
declare module 'js-yaml'
declare module 'prismjs'
declare module 'prismjs/components/*'