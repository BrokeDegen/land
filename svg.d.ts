declare module '*.svg' {
  import * as React from 'react';

  // Allows importing SVGs as React components
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // Allows importing SVGs as StaticImport
  const src: StaticImport;
  export default src;
}

declare module '*.svg?url' {
  const src: StaticImport;
  export default src;
}
