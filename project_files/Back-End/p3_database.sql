/*--- Sabrina Touch ---*/
/* Last Update: 3/12/2018 */

/***
	SIDE NOTES
 	- Will probably need to use FOREIGN KEY instead of PRIMARY KEY.
  ***/

/* TABLE #1 */
CREATE TABLE if not exists user_login (
	userID 		int(1) 		NOT NULL	auto_increment, 
	username 	varchar(255)	NOT NULL,
	password 	varchar(255)	NOT NULL,

	PRIMARY KEY(userID) 	
) CHARACTER SET utf8 COLLATE utf8_general_ci;

/* user_login data will need to be received and stored */
INSERT INTO user_login (userID, username, password) VALUES
('1', 'TestUsername1', 'TestPassword1'),
('2', 'TestUsername2', 'TestPassword2');

/* TABLE #2 */
CREATE TABLE if not exists playlist (
	userID 		int(1)		NOT NULL	auto_increment,
	url 		varchar(255)	NOT NULL,

	PRIMARY KEY(userID)
) CHARACTER SET utf8 COLLATE utf8_general_ci;

/* playlist data will need to be generated, received, and stored */
INSERT INTO playlist (userID, url) VALUES
('1', 'www.testplaylistlink1.com'),
('2', 'www.testplaylistlink2.com');
