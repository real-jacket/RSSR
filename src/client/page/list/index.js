import React from 'react';
import { Helmet } from 'react-helmet';
import isoConnect from '../../common/iso-connect.js';
import { getInitialData } from './redux/index';

function List(props) {
  const { initialData } = props;

  return (
    <div>
      <Helmet>
        <title>{initialData?.page?.tdk?.title}</title>
        <meta
          name="description"
          content={initialData?.page?.tdk?.description}
        />
        <meta name="keywords" content={initialData?.page?.tdk?.keywords} />
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
List.getInitialProps = async ({ store, match, location }) => {
  return store.dispatch(getInitialData());
  // const fetchData = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         code: 0,
  //         data: template,
  //       });
  //     }, 100);
  //   });
  // };
  // let res = await fetchData();
  // return {
  //   fetchData: res,
  //   page: {
  //     tdk: {
  //       title: '文章',
  //       keywords: '前端技术江湖',
  //       description: '前端技术江湖',
  //     },
  //   },
  // };
};

//将 store 中 state 转换为 props传递给组件
const mapStateToProps = (state) => ({
  initialData: state.listPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = (dispatch) => ({
  getInitialData(dispatch) {
    return dispatch(getInitialData());
  },
});

export default isoConnect({ mapStateToProps, mapDispatchToProps }, List);
