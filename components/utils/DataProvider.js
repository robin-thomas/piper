import React, { useState } from "react";

import moment from "moment";

const DataContext = React.createContext();

const DataProvider = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("Sign In");
  const [address, setAddress] = useState(null);
  const [extension, setExtension] = useState({
    name: null,
    iconURL: null,
    developer: null,
    category: null,
    downloads: null,
    rating: null,
    reviews: null,
    network: null,
    developerETH: null,
    authorEditable: null,
    images: [
      "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
      "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
    ],
    version: null,
    overview: null
    // updated: moment().local().add(1, 'days'), /* will expire only after 1 day */
  });

  return (
    <DataContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        email,
        setEmail,
        address,
        setAddress,
        extension,
        setExtension
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
