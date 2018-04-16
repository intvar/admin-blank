import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class InfiniteScroll extends Component {
  constructor(props, context) {
    super(props, context);
    this.check = throttle(this.check.bind(this), props.throttle);
    this.sentinel = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.check);
    window.addEventListener('resize', this.check);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.check);
    window.removeEventListener('resize', this.check);
  }
  check() {
    const {
      isLoading,
      hasMore,
      threshold,
      onLoadMore,
    } = this.props;
    if (isLoading || !hasMore) return;
    const sentinel = this.sentinel.current;
    const fromBottom = sentinel.getBoundingClientRect().top - window.innerHeight;
    if (fromBottom < threshold) onLoadMore();
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div ref={this.sentinel} />
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  threshold: PropTypes.number,
  throttle: PropTypes.number,
};

InfiniteScroll.defaultProps = {
  threshold: 100,
  throttle: 64,
};

export default InfiniteScroll;
