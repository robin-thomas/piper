import { Dropdown, DropdownButton } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";

const categories = [
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

const ExtensionCategory = props => {
  const select = (e, ctx) => {
    const text = e.target.innerHTML.replace(/&amp;/g, "&");
    ctx.setCurrExt({ ...ctx.currExt, category: text });
  };

  return (
    <DataConsumer>
      {ctx =>
        ctx.editable === true ? (
          <DropdownButton
            variant="outline-dark"
            title={
              ctx.currExt && ctx.currExt.category
                ? ctx.currExt.category
                : categories[0]
            }
            disabled={ctx.textDisabled}
          >
            {categories.map(category => (
              <Dropdown.Item key={category} onClick={e => select(e, ctx)}>
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : ctx.currExt && ctx.currExt.category ? (
          ctx.currExt.category
        ) : null
      }
    </DataConsumer>
  );
};

export default ExtensionCategory;
