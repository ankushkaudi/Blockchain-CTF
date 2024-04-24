
const Web3 = require('web3');

const web3 = new Web3('http://localhost:7545'); 

const contractAbi = require('../contractAbi.json'); 
const contractAddress = '0x5DABEa3F4299A2f651138774deAcc08147bd9E02'; 
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const registerUser = async (username, password) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.register(username, password, false).send({ from: accounts[0] });
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error registering user' };
  }
};

const loginUser = async (username, password) => {
  try {
    const result = await contract.methods.login(username, password).call();
    if (result) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error logging in' };
  }
};

module.exports = { registerUser, loginUser };
