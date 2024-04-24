const UserAuthentication = artifacts.require("UserAuthentication");

module.exports = function(deployer) {
  deployer.deploy(UserAuthentication, { gas: 8000000 }); // Increase gas limit
};
