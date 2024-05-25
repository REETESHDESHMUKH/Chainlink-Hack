// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Message {
    string private message;
    function setMessage(string memory _message) public {
        message = _message;
    }
    function getMessage() public view returns (string memory) {
        return message;
    }
}