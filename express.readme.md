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




