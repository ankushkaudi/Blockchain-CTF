// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuthentication {
    struct User {
        bytes32 passwordHash;
        bool isAdmin;
        bool exists;
    }

    mapping(string => User) private users;
    mapping(address => string) private loggedInUsers;

    event UserRegistered(string username);
    event UserLoggedIn(string username);
    event UserLoggedOut(string username);
    event UserInfoUpdated(string username, bytes32 newPasswordHash, bool isAdmin);

    modifier onlyAdmin() {
        require(users[loggedInUsers[msg.sender]].isAdmin, "Perform actions");
        _;
    }

    modifier notLoggedIn() {
        require(bytes(loggedInUsers[msg.sender]).length == 0, "User is already logged in");
        _;
    }

    modifier isLoggedIn() {
        require(bytes(loggedInUsers[msg.sender]).length > 0, "User is not logged in");
        _;
    }

    function registerUser(string memory _username, bytes32 _passwordHash, bool _isAdmin) external notLoggedIn {
        require(!users[_username].exists, "User already exists");
        users[_username] = User(_passwordHash, _isAdmin, true);
        emit UserRegistered(_username);
    }

    function loginUser(string memory _username, bytes32 _passwordHash) external notLoggedIn {
        require(users[_username].exists, "User does not exist");
        require(users[_username].passwordHash == _passwordHash, "Invalid credentials");
        loggedInUsers[msg.sender] = _username;
        emit UserLoggedIn(_username);
    }

    function logoutUser() external isLoggedIn {
        string memory username = loggedInUsers[msg.sender];
        delete loggedInUsers[msg.sender];
        emit UserLoggedOut(username);
    }

    function updatePassword(bytes32 _newPasswordHash) external isLoggedIn {
        string memory username = loggedInUsers[msg.sender];
        users[username].passwordHash = _newPasswordHash;
        emit UserInfoUpdated(username, _newPasswordHash, users[username].isAdmin);
    }

    function updateAdminStatus(string memory _username, bool _isAdmin) external onlyAdmin {
        require(users[_username].exists, "User does not exist");
        users[_username].isAdmin = _isAdmin;
        emit UserInfoUpdated(_username, users[_username].passwordHash, _isAdmin);
    }

    function isAdmin(address _user) external view returns (bool) {
        string memory username = loggedInUsers[_user];
        return users[username].isAdmin;
    }

    function isUserLoggedIn() external view returns (bool) {
        return bytes(loggedInUsers[msg.sender]).length > 0;
    }

    function getUser() external view returns (string memory) {
        return loggedInUsers[msg.sender];
    }
}
