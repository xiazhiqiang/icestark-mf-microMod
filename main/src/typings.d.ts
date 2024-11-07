declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare interface Window {
  [k: string]: any;
}
