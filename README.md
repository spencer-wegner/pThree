# pThree

pThree is a web-based application designed to enable individuals to create a playlist that will fit any occasion, and that everyone will enjoy. Now, wherever you go, whether it is a wedding or a road trip, you will have the perfect playlist.

Create an account on our website and share your username with your friends or party guests so they can submit Spotify playlists to your account. Once you are ready to create your playlist, just hit the button and we'll take care of the rest. Our algorithm combines all the playlists that were submitted to your username and creates a new playlist on your Spotify account with the tracks that your friends or guests will surely want to hear.

**Repository Structure:**

  project_files
  
    backEnd: database information, sql file
    
    frontEnd: HTML/CSS code and images for webpage
    
    integration: middle layer, node.js, json files, etc.
    
    testing: automated unit test files
    
  milestones
  
    all project milestones
    
  meetings
  
    meeting agendas for all meetings throughout semester
    
**How to build, run, test, etc.:**

Hello, there are just a few things you need to do to get our project working on your localhost.
First, lets call the path "pThree/project_files/integration/usingExpress" "base" because we'll use it a lot.

So first thing to do is open mysql and create the database that is defined in pThree/project_files/backEnd/p3_databse.sql.

Next, change the file "base"/db.js so that the username and password values match your username and password for mysql

After that, change the file "base"/routes/createPlaylist.py so that the username and password at the top of that file also match your mysql login information

The last file you need to change is in "base"/index.js. It's a big folder so just scroll down until you see a big gap of whitespace with a comment in the middle saying that the scriptPath variable is right above it (line 232). Modify that variable to be the fullpath on your machine to the routes directory. Or just append "pThree/project_files/integration/usingExpress/routes" to the path to our project.

There are a few dependencies that you will need to install to ensure proper execution of the python script, before starting make sure python is installed on your machine.. First, install the python shell for node js (npm install python-shell). Next, install the mysql connector for python (pip install mysql-connector-python). Finally, install the requests library for python (pip install requests).

Finally, just open a terminal, navigate to "base", then type:
	> npm install
	> npm start
and now it's running on localhost:8080. Simply point a browser at localhost:8080 and you'll be able to do everything on our website. I also liked having a second terminal open running mysql so I could see the values in the tables but that isn't strictly necessary.

Playlist Link #1:
https://open.spotify.com/user/sabrinatouch/playlist/4cLcJXrLLg7rczlwitXMdJ?si=sVtuZYUYQxmIWfLitMuPGw

Playlist Link #2:
https://open.spotify.com/user/sabrinatouch/playlist/2qKrJfbAQF2vLedAg2eAjH?si=3uYzKuWuROq_d7TdA5Catg
