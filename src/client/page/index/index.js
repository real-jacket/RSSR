import React from 'react';

function Index() {
  const handleClick = () => {
    alert('一起来玩 ssr 呀');
  };

  return <h1 onClick={handleClick}>hello react ssr</h1>;
}

export default Index;
