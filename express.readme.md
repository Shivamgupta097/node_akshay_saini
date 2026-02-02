- create a repository
- Initialize the repository
- node_modules, packege.json, package.lock.json
- Install express
- create a server
- Listening on port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What is the use of "-g" while npm install 
- Difference between caret and tilde (^ and ~)

- Initialised git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extesnions ex. hello, /, hello/2,/xyz
- Order of the routes matter a lot
- Install Postman app and make a worspace/collection > test api call

----------------------------------------------------------------
- Explore Routing and use of ?, +, (), * in the routes
- Use of regex /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes //:userId
- app.get , app.post , app.patch, are the different requests
- app.use we can use any routes
- res.send("--") if we are not handeling it than the request will be loop in loading state  

--------------------------------------------------------------
- Handle multiple routes
- next fuction along with route handler
- Make sure if route and api methds are same then we need to use next to call the next api handler.
- It will through error if res.send will not be come in path

--------------------------------------------------------------
- app.use act as middleware including function
- first middleware is called call
- app.use("/", () =>{
    //get , post,patch with matching routes
    next will called up

    response handler are the function which send the report

 }) //middleware


- Main Job of server to send the response
- Middleware route handler - play with the code
- next()
- next function and error along with the res.send()
- app.use("/route", rh1, rhe2)
- What is middleware
- How express js basically handles request behind the scenes
- differernce between app.use and app.all
- error handelng using app.use


----------------------------------------------------------
Creating a database and mongodb
- Go to mongo website
- Create a free mb cluster
- Create a user
- Get the connection string
- Install MongoDB compass

----------------------------------------------------------
- Connect through code
- Document CRUD // CREATE , READ, UPDATE, DELETE
- new MongoClient
- client.connect()
- db = client.db(dbName);
- db.collection('User)

----------------------------------------------------
Mongoose schema
- Create a cluster free in mongo website (Atlas)
- Install Mongoose
- Connect your application to the database "Connection-url/devTinder"
- Call the connectDB function and connect to the database before selecting on application 7777

- Create a user schema
   const User =  mongooser.model('User', userSchema);

----------------------------------------------------------

- Create /signup API to add data to database
- Push some dcument using API calls from postman
- Error Handeling using try, catch
----------------------------------------------------------
JSON vs JS object
- Add the express.josn middleware in your app
- Make your sign up API dynamic to recieve data from the  end userUser.findOne() with duplicate emalIds , which object returned.

---------------------------------------------------------------------------
- Add the express.json middleware to your app
- Make your signup Api dynamic to recieve data from the end user
- User.findOne with duplicate
- Api - CRUD
- Difference between PATCH and put
- Explore the mongoose documentation for model method
- What are option in a ModelfindOneAndUpdatemethod, expolre more about it.
- API - Update the user with emailId

---------------------------------------------------------------------
 
- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLegth, trim 
- Add default
- Create a custom validation function for geneder
- Improve the DB schema - Put all appropriate validations on each field in Schema
- Add timestamp to userSchema
- Data Sanitizing - Add API validation for each field

--------------------------------------------------------------------
- explore validator library
- validate through mongoose or api
- Encrypting the password
- Creating a new user in db

--

- Validate data in signup api
- Install bcrypt package
- Create passwordHash with password using bcrypt.hash and save the user with encrypted passowrd
- Create Login api

------------------------------------------------------

- Install cookie parser
- Just send a dummy cookie to user
- Create GET/Profile api and check if you get the cookie back
-In Login API, create a JWT token

----------------------------------------------------------

- useAuth Middleware
- Add the userAuth as middlewarevin profile API and a new sendConnectionRequest API
-Set the expiry ofJWT token and cookies to 7 days

----------------------------------------------------------

- Explore tinder/api
- Create a list of all api in tinder web app
- Group multiple router under respective router

----------------------------------------------------------

- Explore tinder APIs
- Create a list all API you can think of in DEV tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request router
- Create authRouter, profileRouter, requestRouter.
- Import these routers in app.js



