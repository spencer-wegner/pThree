/*--- Sabrina Touch ---*/
/* Last Update: 3/19/2018 */

/* TO CREATE THE DATABASE CALLED 'p3_database' */
CREATE database p3_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use p3_database; 


/* TABLE #1 */
CREATE TABLE if not exists user_login ( 
	username 	varchar(255)	NOT NULL,
	password 	varchar(255)	NOT NULL,

	PRIMARY KEY(username) 	
);

/* user_login data will need to be received and stored */
INSERT INTO user_login (username, password) VALUES
('TestUsername1', 'TestPassword1'),
('TestUsername2', 'TestPassword2'),
('johnwick', 'puppy');

/* TABLE #2 */
CREATE TABLE if not exists playlist (
	username	varchar(255)	NOT NULL,
	url 		varchar(255)	NOT NULL,

	FOREIGN KEY(username) REFERENCES user_login(username)
);

/* playlist data will need to be generated, received, and stored */
INSERT INTO playlist (username, url) VALUES
('TestUsername1', 'www.testplaylistlink1-1.com'),
('TestUsername1', 'www.testplaylistlink1-2.com'),
('TestUsername2', 'www.testplaylistlink2-1.com');