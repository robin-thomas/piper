import { Col } from "react-bootstrap";

import { DataConsumer } from "../../utils/DataProvider";
import TextInput from "../../utils/TextInput";

const ExtensionName = props => (
  <DataConsumer>
    {ctx => (
      <TextInput
        value={ctx.currExt && ctx.currExt.name ? ctx.currExt.name : ""}
        hint="Extension name"
        class="extension-header-name"
        onChange={e => ctx.setCurrExt({ ...ctx.currExt, name: e.target.value })}
      />
    )}
  </DataConsumer>
);

export default ExtensionName;
