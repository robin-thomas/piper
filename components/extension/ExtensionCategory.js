import { Component } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

export default class ExtensionCategory extends Component {
  constructor(props) {
    super(props);

    this.categories = [
      "All",
      "Accessibility",
      "Blogging",
      "Developer Tools",
      "Fun",
      "News & Weather",
      "Photos",
      "Productivity",
      "Search Tools",
      "Shopping",
      "Social & Communication",
      "Sports"
    ];

    this.state = {
      category:
        props.category !== undefined ? props.category : this.categories[0],
      editable: props.editable !== undefined && props.editable === true
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.editable !== nextProps.user) {
      this.setState({
        editable:
          nextProps.editable !== undefined && nextProps.editable === true
      });
    }
  };

  updateCategory = e => {
    e.preventDefault();

    this.setState({
      category: e.currentTarget.innerHTML.replace(/&amp;/g, "&")
    });
  };

  render() {
    return (
      <div>
        {this.state.editable ? (
          <DropdownButton variant="outline-dark" title={this.state.category}>
            {this.categories.map(category => (
              <Dropdown.Item key={category} onClick={this.updateCategory}>
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : (
          this.state.category
        )}
      </div>
    );
  }
}
