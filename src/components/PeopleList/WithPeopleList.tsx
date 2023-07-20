import React from 'react';
import { FavoritePeopleProps } from './interface';

const WithPeopleList = (Component: React.FC<FavoritePeopleProps>) => {
  const Hoc = (props: FavoritePeopleProps) => { 
    const newProps = {
        ...props,
      };
  
      return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithPeopleList };