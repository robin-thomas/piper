import { MDBInput } from "mdbreact";

import { DataConsumer } from "../utils/DataProvider";

const SidebarSearch = ({ onChange }) => {
  const onInput = (e, ctx) => {
    ctx.setSearch({ ...ctx.search, text: e.target.value });
  };

  const submit = (e, ctx) => {
    e.preventDefault();
    console.log(ctx.search);
    onChange(ctx.search === null ? { text: "" } : ctx.search);
  };

  return (
    <div>
      <DataConsumer>
        {ctx => (
          <form onSubmit={e => submit(e, ctx)}>
            <MDBInput
              containerClass="sidebar-search-item"
              label="Search"
              outline
              size="md"
              value={ctx.search && ctx.search.text ? ctx.search.text : ""}
              onInput={e => onInput(e, ctx)}
            />
          </form>
        )}
      </DataConsumer>
      <style jsx global>{`
        .sidebar-search-item {
          background: #e8eaed;
          margin-bottom: 0 !important;
          margin-top: 0 !important;
        }

        .sidebar-search-item label.active {
          background: #e8eaed !important;
        }
      `}</style>
    </div>
  );
};

export default SidebarSearch;
