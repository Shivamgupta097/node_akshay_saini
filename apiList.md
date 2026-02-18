# DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

----------------------------------------------------------
## profileRouter

- GET /profile/view         // can vieweverything apart from password
- PATCH /profile/edit       // can edit every details apart from email and password
- PATCH /profile/password


-----------------------------------------------------
## connectionRequestRouter

Status : ignore, interested, accepted, rejected

POST /request/send/interested/:userId
POST /request/send/rejected/:userId

POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

-----------------------------------------------------------------
## userRouter
- GET /user/connection
- GET /user/request/recieved
- GET /user/feed  //users with not having connection  .