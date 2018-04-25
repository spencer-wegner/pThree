import mysql.connector
import sys
import json
import random

c = mysql.connector.connect(user='root', password='movies',
                            host='localhost',
                            database='p3_database')
cursor = c.cursor()

Tracks=[]

def popuTracks():
	query = ("SELECT trackURI FROM playlist")#WHERE username = ")
	cursor.execute(query)
	#Handle this returned data and populate tracks with track uri
	for trackURI in cursor:
		Tracks.append(trackURI[0][trackURI[0].find("uri")+6:len(trackURI[0])-3])

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
		temp=trackURI+","
		uriList=uriList+temp
	else:
		if random.getrandbits(1) == 1:
			#Not a match, but we take to fill our lists
			trackURI = item[0]
			temp=trackURI+","
			uriList=uriList+temp

uriList=uriList[uriList.find("spotify:track"):len(uriList)-3]
print(sys.argv[2])
print(uriList)