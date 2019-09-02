import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Sort extends Component {
  state = {
    sort_by: "created_at",
    order: "desc"
  };
  render() {
    const { sortArticles } = this.props;
    const { sort_by, order } = this.state;
    return (
      <DropdownButton
        className="dropdownSort"
        id="dropdown-item-button"
        title="Sort"
        variant="secondary"
      >
        <Dropdown.Item
          active={sort_by === "created_at"}
          as="button"
          name="sort_by"
          value="created_at"
          onClick={this.handleSortClick}
        >
          by date
        </Dropdown.Item>
        <Dropdown.Item
          active={sort_by === "author"}
          as="button"
          name="sort_by"
          value="author"
          onClick={this.handleSortClick}
        >
          by author
        </Dropdown.Item>
        <Dropdown.Item
          active={sort_by === "votes"}
          as="button"
          name="sort_by"
          value="votes"
          onClick={this.handleSortClick}
        >
          by votes
        </Dropdown.Item>
        {sortArticles && (
          <Dropdown.Item
            active={sort_by === "topic"}
            as="button"
            name="sort_by"
            value="topic"
            onClick={this.handleSortClick}
          >
            by topic
          </Dropdown.Item>
        )}
        {sortArticles && (
          <Dropdown.Item
            active={sort_by === "comment_count"}
            as="button"
            name="sort_by"
            value="comment_count"
            onClick={this.handleSortClick}
          >
            by comments
          </Dropdown.Item>
        )}
        <Dropdown.Divider />
        <Dropdown.Item
          active={order === "desc"}
          as="button"
          name="order"
          value="desc"
          onClick={this.handleSortClick}
        >
          descending
        </Dropdown.Item>
        <Dropdown.Item
          active={order === "asc"}
          as="button"
          name="order"
          value="asc"
          onClick={this.handleSortClick}
        >
          ascending
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  handleSortClick = e => {
    const { handleClick, sortArticles, updatePage } = this.props;
    handleClick(e);
    this.setState({ [e.target.name]: e.target.value });
    if (sortArticles) {
      updatePage(1);
    }
  };
}

export default Sort;
