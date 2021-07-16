import withStyles from 'isomorphic-style-loader/withStyles';
import { connect } from 'react-redux';
import pageContainer from './page-container';

export default (
  { css, mapStateToProps, mapDispatchToProps },
  ActiveComponent
) => {
  return css
    ? withStyles(css)(
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(pageContainer(ActiveComponent))
      )
    : connect(
        mapStateToProps,
        mapDispatchToProps
      )(pageContainer(ActiveComponent));
};
