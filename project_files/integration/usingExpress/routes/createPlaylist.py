import mysql.connector
import sys
import requests
import json

c = mysql.connector.connect(user='root', password='movies',
                            host='localhost',
                            database='p3_database')
cursor = c.cursor()

Tracks=[]

def popuTracks():
	query = ("SELECT url FROM playlist")#WHERE username = ")
	cursor.execute(query)
	#Handle this returned data and populate tracks with track uri
	for url in cursor:
		Tracks.append(url[0])

Counts=[];
def popuCounts():
	for i in range(0,len(Tracks)):
		remove=[];
		if Tracks[i]!="":
			#Track exists, handle it
			temp=Tracks[i];
			count=0;
			#Count all occurences
			for index in range(0,len(Tracks)):
				if Tracks[index]==temp:
					count=count+1
					remove.append(index)
			Counts.append([Tracks[i],count]);
			#remove all occurences
			for index in remove:
				Tracks[index]="";

popuTracks() #working
popuCounts() #working

cursor.close()
c.close()

#create new playlist
uriList="uris="
for item in Counts:
	if item[1] > 1:
		#count is greater than 1, add it
		trackURI = item[0]
		temp="spotify:track:"+trackURI+","
		uriList=uriList+temp

uriList=uriList[0:len(uriList)-1]

spotifyUsername = sys.argv[1]
token = sys.argv[0]
console.log(spotifyUsername,token)
data = {"name":"P3 Playlist", "public":"false"}
headers = {"Authorization":token,"Content-Type":"application/json"}
response = requests.post("https://api.spotify.com/v1/users/"+userID+"/playlists/", data, headers)