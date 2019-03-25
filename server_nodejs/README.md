#### Game Exchange Server Nodejs + Mongodb

Step1: Install mongodb (version >=2.2)

Step2: Start mongod

    run cmd: mongod --dbpath=<data storage path>
    example: mongod --dbpath=/home/user/game_exchange/data

Step3: Install lib

    cd server_nodejs

    run cmd: npm install

Step4: Start server

  2 way: 

    1. Using Visual Studio Code:
      Select the debug tab in the left menu bar, then click on the button Start Debugging (Launch Program mode)

    2. Using cmd:
        cd server_nodejs

        After that, export environment variable if you want to override the default value
        (Ex: run cmd: export PORT=9999)

        Finally, run cmd: node server.js

Step5: To init the first user into the database

   2 way: 

    1. Using Visual Studio Code:
        Select the debug tab in the left menu bar, then click on the button Start Debugging (Initialize Database mode)

    2. Using cmd:

        cd server_nodejs

        After that, export environment variable if you want to override the default value
        (Ex: export DB_URL=...)

        Finally, run cmd: node setup/init.js

        *Currently, `user`, `admin` and `normal` are users default (password is the same as the username) 

Step6: Test api, after starting server

        POST http://<host>:<port>/api/auth/login

        Body(JSON): {"username":"admin","password":"admin"}



#### List api


*Note: (*) : require, otherwise optional

## Game

Add game

        POST http://<host>:<port>/api/games

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data(*): {"title": "any thing" (*), "type": "games/management...."(*)}
                            icon: File image,
                            image: File image
                          }
        Response: 200 success
                  401 authenticate
                  403 access denied (apply for admin)
                  400 error

Update game 

				POST http://<host>:<port>/api/games/:gameId

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data: {"title": "any thing" (*), "type": "games/management...."(*)}
                            icon: File image,
                            image: File image
                          }
        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of game)
                  400 error				


Delete game 

				DELETE http://<host>:<port>/api/games/:gameId

        Header: {Authorization :  `jwt {{token}}`}

        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to users who have role master)
                  400 error			

Get list 

				GET http://<host>:<port>/api/games(?page=..&limit=..&type=..)

        Response: 200 success ({results: list result, total: total records})

Get game by id

				GET http://<host>:<port>/api/games/:gameId

        Response: 200 success (game object)


## Item

Add item

        POST http://<host>:<port>/api/items/game/:gameId

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data(*): {"title": "any thing" (*)}
                            image: File image
                          }
        Response: 200 success
                  401 authenticate (Only applies to users who have role master and normal)
                  403 access denied
                  400 error

Update item 

				POST http://<host>:<port>/api/items/:itemId

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data: {"title": "any thing" (*), "type": "games/management...."(*)}
                            image: File image
                          }
        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of item)
                  400 error				


Delete item 

				DELETE http://<host>:<port>/api/items/:itemId

        Header: {Authorization :  `jwt {{token}}`}

        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to users who have role is admin or normal )
                  400 error			

Get list item 

				GET http://<host>:<port>/api/items(?page=..&limit=..)

        Response: 200 success ({results: list result, total: total records})

Get item by id

				GET http://<host>:<port>/api/items/:itemId

        Response: 200 success (item object)

Get list item by game


        GET http://<host>:<port>/api/items/game/:gameId(?limit=...&page=...)

        Response: 200 success (items)


## Post

Add post
	
        POST http://<host>:<port>/api/posts/item/:itemId

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data(*): 
                                    {"title(*)": "any thing" (*)
                                      "description": "......",
                                      "type(*)": "sell/buy",
                                      "price": number,
                                      "lastest": "......"
                                    },

                            image: File image,
														image: File image
														.
														.
														.
														--> list image
                          }
        Response: 200 success
                  401 authenticate
                  400 error

Update post 

				POST http://<host>:<port>/api/post/:postId

        Header: {Authorization :  `jwt {{token}}`}
        Body(form-data):	{ 
                        		data: 
                                    {"title": "any thing" (*)
                                      "description": "......",
                                      "type": "sell/buy",
                                      "price": number,
                                      "lastest": "......"
                                    },

                            image: File image,
														image: File image
														.
														.
														.
														--> list image
                          }
        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of post)
                  400 error				


Delete post 

				DELETE http://<host>:<port>/api/posts/:postId

        Header: {Authorization :  `jwt {{token}}`}

        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of item or admin or normal)
                  400 error			

Get list post 

				GET http://<host>:<port>/api/posts(?page=..&limit=..)

        Response: 200 success ({results: list result, total: total records})

Get post by id

				GET http://<host>:<port>/api/posts/:postId

        Response: 200 success (post object)

Get list post by item


        GET http://<host>:<port>/api/posts/item/:itemId(?limit=...&page=...)

        Response: 200 success (posts)


## Comment
                    
  

Add comment

        POST http://<host>:<port>/api/comments/:postId
        Header: {Authorization :  `jwt {{token}}`}
        Body(json):	{ "message": "........."        },

        Response: 200 success
                  401 authenticate
                  400 error

Update comment 

				PUT http://<host>:<port>/api/comments/:commentId

        Header: {Authorization :  `jwt {{token}}`}
        Body(json):	{"message": "........"}
        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of comment)
                  400 error				


Delete comment 

				DELETE http://<host>:<port>/api/comments/:commentId

        Header: {Authorization :  `jwt {{token}}`}

        Response: 200 success
                  401 unauthenticate
                  403 access denied (Only applies to user who is owner of comment or admin/ normal/ower of post)
                  400 error			

Get list comment  

				GET http://<host>:<port>/api/comments(?page=..&limit=..)

        Response: 200 success ({results: list result, total: total records})

Get comment by id

				GET http://<host>:<port>/api/comments/:commentId

        Response: 200 success (post object)

Get list comment by post


        GET http://<host>:<port>/api/comments/post/:postId(?limit=...&page=...)

        Response: 200 success (comment list)


