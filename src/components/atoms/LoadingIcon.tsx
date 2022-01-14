import React from 'react';
import ReactLoading from 'react-loading';

function AtomLoadingIcon({ height = '100%', color, width = '100%' }: Props) {
  return <ReactLoading type="spinningBubbles" width={width} height={height} />;
}

export default AtomLoadingIcon;

interface Props {
  width?: string;
  height?: string;
  color?: string;
}
