/*--- Sabrina Touch ---*/
/* Last Update: 4/20/2018 */

/* TO CREATE THE DATABASE CALLED 'p3_database' */
CREATE database p3_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use p3_database; 


/* TABLE #1 */
CREATE TABLE if not exists user_login ( 
	username 	varchar(255)	NOT NULL,
	password 	varchar(255)	NOT NULL,

	PRIMARY KEY(username) 	
);

/* TABLE #2 */
CREATE TABLE if not exists playlist (
	username	varchar(255)	NOT NULL,
	trackURI 	varchar(255)	NOT NULL,

	FOREIGN KEY(username) REFERENCES user_login(username)
);

/* playlist data will need to be generated, received, and stored */
INSERT INTO playlist (username, url) VALUES
('TestUsername1', 'www.testplaylistlink1-1.com'),
('TestUsername1', 'www.testplaylistlink1-2.com'),
('TestUsername2', 'www.testplaylistlink2-1.com');
