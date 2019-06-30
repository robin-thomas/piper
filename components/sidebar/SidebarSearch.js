import { MDBInput } from "mdbreact";

const SidebarSearch = props => (
  <div>
    <MDBInput
      containerClass="sidebar-search-item"
      label="Search"
      outline
      size="md"
    />
    <style jsx global>{`
      .sidebar-search-item {
        background: #e8eaed;
        margin-bottom: 0 !important;
        margin-top: 0 !important;
      }
    `}</style>
  </div>
);

export default SidebarSearch;
