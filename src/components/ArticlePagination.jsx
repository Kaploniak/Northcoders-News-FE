import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";

class ArticlePagination extends Component {
  state = {
    p: 1,
    total_count: 0,
    limit: 10
  };
  render() {
    const { total_count, limit } = this.state;
    let pagination = Math.ceil(total_count / limit);
    let items = [];
    for (let number = 1; number <= pagination; number++) {
      items.push(
        <Pagination.Item key={number} onClick={this.handleClick}>
          {number}
        </Pagination.Item>
      );
    }

    return <Pagination className="pagination">{items}</Pagination>;
  }

  handleClick = e => {
    this.setState({ p: e.target.text });
  };

  componentDidMount() {
    const { p, total_count } = this.props;
    this.setState({ p, total_count });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      this.props.updatePage(this.state.p);
    }
  }
}

export default ArticlePagination;
