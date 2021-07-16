import React from 'react';
import { Helmet } from 'react-helmet';
import isoConnect from '../../common/iso-connect';
import css from './index.css';

function Index(props) {
  const { initialData } = props;

  const handleClick = () => {
    alert('一起来玩 ssr 呀');
  };

  return (
    <>
      <Helmet>
        <title>{initialData?.page?.tdk?.title}</title>
        <meta
          name="description"
          content={initialData?.page?.tdk?.description}
        />
        <meta name="keywords" content={initialData?.page?.tdk?.keywords} />
      </Helmet>
      <h1 onClick={handleClick}>hello react ssr</h1>
      <p>{initialData?.fetchData?.data}</p>
    </>
  );
}

Index.getInitialProps = async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: 'xxx-yy-测试',
        });
      }, 100);
    });
  };
  let res = await fetchData();
  return {
    fetchData: res,
    page: {
      tdk: {
        title: '首页',
      },
    },
  };
};

export default isoConnect({ css }, Index);
