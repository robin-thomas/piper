import { useState, forwardRef, useImperativeHandle } from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";

const ExtensionCategory = forwardRef(({ category, editable }, ref) => {
  const [category_, setCategory] = useState(category);
  const [disableTextFields_, disableTextFields] = useState(false);

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

  useImperativeHandle(ref, () => ({
    reset() {
      setCategory(category);
    },

    disable(status) {
      disableTextFields(status);
    },

    details() {
      return {
        category: category_
      };
    }
  }));

  return (
    <div ref={ref}>
      {editable ? (
        <DropdownButton
          variant="outline-dark"
          title={category_ !== undefined ? category_ : categories[0]}
          disabled={disableTextFields_}
        >
          {categories.map(category => (
            <Dropdown.Item key={category} onClick={updateCategory}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        category_
      )}
    </div>
  );
});

export default ExtensionCategory;