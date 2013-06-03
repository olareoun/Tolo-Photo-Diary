Feature: Login
 As 			user 
 I want 		to login 
 in order to 	see my elections.


Scenario: 
 Given   	I am in zizerones.com
 When   	I am in the home page logged
 Then    	I can see logout button
 And 	  	I can see profile button 

Scenario: 
 Given   	I am in zizerones.com
 When   	I am in the home page
 And 		I login with wrong user
 Then    	I can see an user not found error

Scenario: 
 Given   	I am in zizerones.com
 When   	I am in the home page logged
 And 		I logout
 Then    	I can see login button
