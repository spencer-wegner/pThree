import mysql.connector
import sys
import urllib2
import json

Tracks=[]

spotifyURL = "https://open.spotify.com/user/michael.f.hering/playlist/57YJF1pHkPQKyp7hA1SJ6l" #sys.argv[1]
userID = spotifyURL[spotifyURL.find("/user/")+6:spotifyURL.find("/playlist/")]
playlistID = spotifyURL[spotifyURL.find("/playlist/")+10:len(spotifyURL)]

#First get the JSON
response = urllib2.urlopen("https://api.spotify.com/v1/users/"+userID+"/playlists/"+playlistID+"/tracks")
print(response)
#connector code to set up c
c = mysql.connector.connect(user='root', password='movies',
                            host='localhost',
                            database='p3_database')
cursor = c.cursor()

c.close()