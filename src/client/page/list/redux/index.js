import mock_data from '../data';

export const ACTION_TYPE = {
  changeList: 'list/changeList',
};

const changeList = (data) => ({
  type: ACTION_TYPE.changeList,
  data,
});

//
export const getInitialData = (props) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          fetchData: {
            code: 0,
            data: mock_data,
          },
          page: {
            title: '列表页 - koa-react-ssr',
            keywords: '关键词 koa-react-react-ssr',
            description: '描述 koa-react-ssr',
          },
        };
        resolve(data);
        dispatch(changeList(data));
      }, 500);
    });
  };
};

const defaultState = {
  fetchData: {},
  page: {},
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeList:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
