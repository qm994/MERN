# MERN
A full stack application developed with backend Mongodb, node.js and frontend with React, Redux etc


## TODO

@: Add logout correlate action/type to remove user and its token;
@: Dynamically show login, signin, logout in the NavBar

## Models

User(schema): https://github.com/qm994/MERN/blob/master/models/User.js#L3

Profile(schema): https://github.com/qm994/MERN/blob/master/models/Profile.js#L3

Post(schema): https://github.com/qm994/MERN/blob/master/models/Post.js#L5


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
  }
  
(2) `api/auth`: GET(get the user information, return `all the fields in a user document except password`)
  
  header: {
    x-auth-token: <Your token>
  }
  
### profile
(1) `api/profile/me`: GET(get the auth user's profile, return `all the profile fields`)

   header: {
    x-auth-token: <Your token>
  }
  
(2) `api/profile`: POST(update/create a user's profile except education & experience fields)

  header: {
    x-auth-token: <Your token>
  }
  
(3) `api/profile`: GET(get all the users profile)

(4) `api/profile/user?user_id=<user_id>`: GET(get the profile for a user)

  params: { user_id }

(5) `api/profile`: DELETE(delete the user and profile)

  header: {
    x-auth-token: <Your token>
  }
  
(6) `api/profile/experience`: PUT(create the auth user's experience in his profile)

  header: {
    x-auth-token: <Your token>
  }
  
(7) `api/profile/experience/:exp_id`: DELETE(delete a user's specific experience)

   header: {
    x-auth-token: <Your token>
  }

(8) `api/profile/education`: PUT(create the auth user's education in his profile)

  header: {
    x-auth-token: <Your token>
  }
  
(9) `api/profile/education/:edu_id`: DELETE(delete a user's specific education)

   header: {
    x-auth-token: <Your token>
  }
  
(10) `api/profile/github/:username`: GET(get a user's github repo information)


### post

(1) `api/posts`: PUT(create a post)
   
   header: {
    x-auth-token: <Your token>
  }
  
   body: {
    'text': String
  }

(2) `api/posts`: GET(get all the posts)
  
  header: {
    x-auth-token: <Your token>
  }

(3) `api/posts/:id`: GET(get the post by ID)
  
  header: {
    x-auth-token: <Your token>
  }
  
(4) `api/posts/:id`: DELETE(delete the post by ID)

  header: {
    x-auth-token: <Your token>
  }
  
(5) `api/posts/like/:id`: PUT(like a post):

  header: {
    x-auth-token: <Your token>
  }
  
(6) `api/posts/unlike/:id`: PUT(unlike a post):

  header: {
    x-auth-token: <Your token>
  }
  
(7) `api/posts/comment/:id`: POST(add a comment to the post)

   header: {
    x-auth-token: <Your token>
  }
  
   body: {
    'text': String
  }

(8) `api/posts/comment/:id`: DELETE(delete a comment)

  header: {
    x-auth-token: <Your token>
  }

    
