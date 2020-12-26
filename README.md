# MERN
A full stack application developed with backend Mongodb, node.js and frontend with React, Redux etc

## Models


## Routes

### user
(1) `api/user`: POST(register a new user, return `a new token`)
  {
    "name",
    "email",
    "password"
  }

### auth
(1) `api/auth`: POST(create a new token for the existing user, return `a new token`)
  {
    "eamil",
    "password"
  } <br />
  
(2) `api/auth`: GET(get the user information, return `all the fields in a user document except password`)
  
  header: {
    x-auth-token: <Your token>
  }
  
