import React, { useState } from "react";

const DataContext = React.createContext();

const DataProvider = props => {
  const [newExt, setNewExt] = useState(false);
  const [editable, setEditable] = useState(false);
  const [authorEditable, setAuthorEditable] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("Sign In");
  const [address, setAddress] = useState(null);
  const [extension, setExtension] = useState(null);
  const [currExt, setCurrExt] = useState(null);
  const [extUploadProgress, setExtUploadProgress] = useState(0);
  const [textDisabled, setTextDisabled] = useState(false);
  const [search, setSearch] = useState(null);
  const [extensions, setExtensions] = useState([]);

  return (
    <DataContext.Provider
      value={{
        newExt,
        setNewExt,
        editable,
        setEditable,
        authorEditable,
        setAuthorEditable,
        loggedIn,
        setLoggedIn,
        email,
        setEmail,
        address,
        setAddress,
        extension,
        setExtension,
        currExt,
        setCurrExt,
        extUploadProgress,
        setExtUploadProgress,
        textDisabled,
        setTextDisabled,
        search,
        setSearch,
        extensions,
        setExtensions
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;

export { DataContext };
export { DataConsumer };
export default DataProvider;
