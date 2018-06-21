# Music library
With the music library you can add every song you want to a global list of songs when you are logged in. When you are logged in you can only remove or update your own songs. An admin should delete or update every song inside the playlist.   

## How to install

### Clone git
- Open your terminal
- Go to the folder where you want to install the music library or make a folder with `mkdir`
- Run the code below to clone the music libary
```
clone https://github.com/GuusDijkhuis/music-library.git
```

### Install mongodb
I prefer to install mongoDB for save al the data.

- Install mongodb en start mongodb (This is only useable if you have installed [Homebrew](https://brew.sh/index_nl)
Homebrew)
```
brew install mongodb
brew services start mongodb
```

Open another tab in your terminal

- Make a database folder
```
mkdir db
mongod --dbpath db
```

Go back to your original tab and don't close any tab

- Now you need to make a mongo database and make 2 tables: `users` and `music`. Use the code below:
```
mongo
use mymusicdatabase
db.runCommand( { create: "users" } )
db.runCommand( { create: "music" } )
```

- After you made a database you need to make a connection it with your database. So make a `.env` file in your folder and put the following code inside.
```
DB_HOST=localhost
DB_USER=root
DB_PORT=27017
DB_NAME=mymusicdatabase
SESSION_SECRET=secret_message
```
Now we were done with the installation of MongoDB

### Build project

- Install npm and the packages
```
npm install
```

- Your project is hosted on your localhost, when you go to `http://localhost:1900/`

## Run project
If you want to run the server you can use the code below
```
nodemon server/index.js
```

## Technology used

For this project I used:
- [Node.js](https://nodejs.org/en/) the base where my project is made in
    - [Body paser](https://github.com/expressjs/body-parser) used to
    get all the input values of a form.
    - [Multer](https://github.com/expressjs/multer) used to parse my images
    - [Dotenv](https://www.npmjs.com/package/dotenv) I've used this to save local your secret keys without leaking to the outside
    - [Argon2](https://www.npmjs.com/package/argon2) saved my password a lot safer.
    - [Nodemon](https://nodemon.io/) Restart the server automatically when you changed something in the code.  
- [Express](https://www.express.com/) A framework of node what i used for this project for easier coding.
  - [Express-session](https://github.com/remy/nodemon)

## To-do list
- [x] Make a server
- [x] Make a music library
- [x] Add function for add music to the library
- [x] Delete function for delete music from the library
- [x] Make a database connection with [MongoDB](https://www.mongodb.com/)
- [x] Let people register themself and save the data in the database  
- [x] Let people login and store the session
- [x] Make an administrator account who can change everything
- [ ] Good error handling for the users
- [ ] Favorite songs
- [ ] Make a playlist where other users can put their favorite song into but you don't
- [ ] Make matches based on the genre you listened in the past.
- [ ] Let users chat with a match
- [ ] Use the [Spotify API](https://developer.spotify.com/documentation/web-api/) so I can use the database of Spotify


## Conclusion
I learned a lot when is made the music library. The first 5 weeks we've learned everything but it was pretty overwhelming. I thought it was too much for me to understand. I was surprised that I know the matter better at the end of the course. It was nice to make a product what really works and is understandable for me.
