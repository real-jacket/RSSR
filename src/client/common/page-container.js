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
      const props = this.props;
      const store = window.__STORE__;

      const { match, location } = props;

      const res = props.getInitialProps
        ? await props.getInitialProps(store.dispatch)
        : SourceComponent.getInitialProps
        ? await SourceComponent.getInitialProps({ store, match, location })
        : {};

      let { tdk } = res.page || {};
      if (tdk) {
        document.title = tdk.title;
      }
    }

    async componentDidMount() {
      _this = this;
      /**
       * 注意：
       * 需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。
       * 只有在做出浏览器动作时，才会触发该事件，
       * 如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）
       */
      window.__IS_SSR__ &&
        window.addEventListener('popstate', popStateCallback);

      // 避坑，首次进入页面的时候 action 为 POP
      const canClientFetch =
        this.props.history && this.props.history.action === 'PUSH';

      if (canClientFetch || !window.__IS_SSR__) {
        await this.getInitialProps();
      }
    }

    render() {
      const props = { initialData: {}, ...this.props };

      if (this.state.canClientFetch) {
        props.initialData = this.state.initialData || {};
      } else {
        props.initialData = this.props.initialData;
      }

      return <SourceComponent {...props}></SourceComponent>;
    }
  };
};
