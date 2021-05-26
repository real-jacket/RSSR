import React, { useState, useEffect } from 'react';
import template from './data.js';

function List(props) {
  const [initialData, setInitialData] = useState(() => {
    if (__SERVER__) {
      const { code, data } = props.staticContext.initialData || {};
      return data;
    } else {
      const { code, data } = props.initialData || {};
      return data;
    }
  });

  useEffect(() => {
    if (!initialData) {
      List.getInitialProps().then((res) => {
        const { code, data } = res;
        setInitialData(data);
      });
    }
  }, []);

  return (
    <div>
      {initialData &&
        initialData.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })}
      {!initialData && <div>暂无数据</div>}
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
  return res;
};

export default List;
