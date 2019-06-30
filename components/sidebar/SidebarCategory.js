import { useState, useImperativeHandle } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

const SidebarCategory = () => {
  const [category_, setCategory] = useState("All");

  const categories = [
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

  const updateCategory = e => {
    e.preventDefault();

    setCategory(e.target.innerHTML.replace(/&amp;/g, "&"));
  };

  return (
    <div>
      <DropdownButton
        className="sidebar-category-dropdown"
        variant="outline-dark"
        title={category_}
      >
        {categories.map(category => (
          <Dropdown.Item key={category} onClick={updateCategory}>
            {category}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <style jsx global>{`
        .sidebar-category-dropdown > button {
          width: 100%;
          text-align: left;
        }

        .sidebar-category-dropdown > button::after {
          float: right;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default SidebarCategory;
