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