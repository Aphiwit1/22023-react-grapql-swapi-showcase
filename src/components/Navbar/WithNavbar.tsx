import React from 'react';
import { ComponentProps } from './interface';

const WithNavbar = (Component: React.FC<ComponentProps>) => {
  const Hoc = (props:ComponentProps) => { 
    const newProps = {
        ...props,
      };
      return <Component {...newProps} />;
  };
  return Hoc;
};

export { WithNavbar };

