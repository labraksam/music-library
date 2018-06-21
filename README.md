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

## Technology

## To-do list

## Conclusion













































.
