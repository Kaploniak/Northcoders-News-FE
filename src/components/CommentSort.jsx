import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class CommentSort extends React.Component {
  render() {
    const { handleClick } = this.props;
    return (
      <DropdownButton
        className="dropdownSort"
        id="dropdown-item-button"
        title="Sort"
        variant="secondary"
      >
        <Dropdown.Item
          as="button"
          name="sort_by"
          value="author"
          onClick={handleClick}
        >
          by author
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          name="sort_by"
          value="votes"
          onClick={handleClick}
        >
          by votes
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          name="sort_by"
          value="created_at"
          onClick={handleClick}
        >
          by create time
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          name="order"
          value="asc"
          onClick={handleClick}
        >
          ascending
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          name="order"
          value="desc"
          onClick={handleClick}
        >
          descending
        </Dropdown.Item>
      </DropdownButton>
    );
  }
}

export default CommentSort;
