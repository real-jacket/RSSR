import React from 'react';
import template from './data.js';
import { Helmet } from 'react-helmet';
import PageContainer from '../../common/page-container.js';

function List(props) {
  const { initialData } = props;

  return (
    <div>
      <Helmet>
        <title>{initialData?.page?.tdk.title}</title>
        <meta name="description" content={initialData?.page?.tdk.description} />
        <meta name="keywords" content={initialData?.page?.tdk.keywords} />
      </Helmet>
      {initialData.fetchData?.data ? (
        initialData.fetchData?.data.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })
      ) : (
        <div>暂无数据</div>
      )}
    </div>
  );
}

// 数据预取方法
List.getInitialProps = async () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: template,
        });
      }, 100);
    });
  };
  let res = await fetchData();
  return {
    fetchData: res,
    page: {
      tdk: {
        title: '文章',
        keywords: '前端技术江湖',
        description: '前端技术江湖',
      },
    },
  };
};

export default PageContainer(List);
