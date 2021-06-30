import React, { useState, useEffect } from 'react';
import template from './data.js';
import { Helmet } from 'react-helmet';

function List(props) {
  const [initialData, setInitialData] = useState(() => {
    if (__SERVER__) {
      const { fetchData, page } = props.staticContext.initialData || {};
      return {
        fetchData,
        page,
      };
    } else {
      const { fetchData, page } = props.initialData || {};
      return {
        fetchData: fetchData,
        page,
      };
    }
  });

  useEffect(() => {
    let { tdk } = initialData.page || {};
    if (tdk) {
      document.title = tdk.title;
    }
    if (!initialData.fetchData) {
      List.getInitialProps().then((res) => {
        const { fetchData, page } = res;
        setInitialData({
          fetchData: fetchData || [],
          page,
        });
        document.title = page.tdk.title;
      });
    }
  }, [initialData]);

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

export default List;
