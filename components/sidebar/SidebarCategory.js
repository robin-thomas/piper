import { useState } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

import { DataConsumer } from "../utils/DataProvider";

const SidebarCategory = ({ onChange }) => {
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

  const updateCategory = (e, ctx) => {
    e.preventDefault();

    const category = e.target.innerHTML.replace(/&amp;/g, "&");
    const search = { ...ctx.search, category: category };
    ctx.setSearch(search);

    onChange(search);
  };

  return (
    <div>
      <DataConsumer>
        {ctx => (
          <DropdownButton
            className="sidebar-category-dropdown"
            variant="outline-dark"
            title={
              ctx.search && ctx.search.category
                ? ctx.search.category
                : categories[0]
            }
          >
            {categories.map(category => (
              <Dropdown.Item
                key={category}
                onClick={e => updateCategory(e, ctx)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </DataConsumer>
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
