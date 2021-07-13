import React from 'react';

let _this = null;

const popStateCallback = () => {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    _this.getInitialProps();
  }
};

export default (SourceComponent) => {
  return class HoComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialData: {},
        canClientFetch: false,
      };
    }

    // 用于服务端调用
    static async getInitialProps(ctx) {
      return SourceComponent.getInitialProps
        ? await SourceComponent.getInitialProps(ctx)
        : {};
    }

    async getInitialProps() {
      const { match, location } = this.props;
      const res = SourceComponent.getInitialProps
        ? await SourceComponent.getInitialProps({ match, location })
        : {};

      this.setState({
        initialData: res,
        canClientFetch: true,
      });

      let { tdk } = res.page;
      if (tdk) {
        document.title = tdk.title;
      }
    }

    async componentDidMount() {
      _this = this;
      window.addEventListener('popstate', popStateCallback);

      // 避坑，首次进入页面的时候 action 为 POP
      console.log('this.props', this.props);
      const canClientFetch =
        this.props.history && this.props.history.action === 'PUSH';
      if (canClientFetch || !window.__IS_SSR__) {
        await this.getInitialProps();
      }
    }

    render() {
      const props = { initialData: {}, ...this.props };

      if (__SERVER__) {
        props.initialData = this.props.staticContext.initialData || {};
      } else {
        if (this.state.canClientFetch) {
          props.initialData = this.state.initialData || {};
        } else {
          props.initialData = window.__INITIAL_DATA__;
          window.__INITIAL_DATA__ = {};
        }
      }

      return <SourceComponent {...props}></SourceComponent>;
    }
  };
};
