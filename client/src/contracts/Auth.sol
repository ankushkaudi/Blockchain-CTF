// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth
{ 
	uint public userCount = 0;

	mapping(string => user) public usersList;

	struct user
	{
		string username;
		string email;
		string password;
	}

	mapping(string => flags) public challenges;

	struct flags {
		string challengeName;
		string flag;
		uint points;
	}

// events

event userCreated(string username, string email, string password);

function createUser(string memory _username, string memory _email, string memory _password) public
{	 
	userCount++;
	usersList[_email] = user(_username, _email, _password);
	emit userCreated(_username, _email, _password);
}

event createFlag(string challengeName, string flag, uint points);

function saveFlag(string memory _challengeName, string memory _flag, uint _points) public {
	challenges[_challengeName] = flags(_challengeName, _flag, _points);
	emit createFlag(_challengeName, _flag, _points);
}
}
