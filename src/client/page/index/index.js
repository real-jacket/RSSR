import React from 'react';
import { Helmet } from 'react-helmet';

function Index() {
  const handleClick = () => {
    alert('一起来玩 ssr 呀');
  };

  return (
    <>
      <Helmet>
        <title>首页</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <h1 onClick={handleClick}>hello react ssr</h1>
    </>
  );
}

export default Index;
