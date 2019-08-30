import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";

class ArticlePagination extends Component {
  state = {
    p: 1,
    limit: 10
  };
  render() {
    const { limit } = this.state;
    const { total_count } = this.props;
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
    this.props.updatePage(e.target.text);
  };
}

export default ArticlePagination;
