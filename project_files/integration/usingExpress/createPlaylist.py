import mysql.connector
import sys
import urllib2
import json

c = mysql.connector.connect(user='root', password='movies',
                            host='localhost',
                            database='p3_database')
cursor = c.cursor()

insert_test = ("INSERT INTO playlist (username, url) VALUES ('johnwick','inserted-from-python1');")

cursor.execute(insert_test)

c.commit()
cursor.close()
c.close()

# Tracks=[]

# def popuTracks():
# 	query = ("")
# 	cursor.execute(query)
# 	#Handle this returned data and populate tracks with track uri

# Counts=[[],[]];
# def popuCounts:
# 	for i in range(0,len(Tracks)):
# 		remove=[];
# 		if Tracks[i]!="":
# 			#Track exists, handle it
# 			temp=Tracks[i];
# 			count=1;
# 			#Count all occurences
# 			for i in range(i+1,len(Tracks)):
# 				if Tracks[i]=temp:
# 					count=count+1
# 					remove.append(Tracks[i])
# 			Counts.append[Tracks[i],count];
# 			#remove all occurences
# 			for item in remove:
# 				item="";


# #create new playlist
# #for item in counts:
# #	trackURI = Tracks[i]
# 	#API call to add this track to the playlist