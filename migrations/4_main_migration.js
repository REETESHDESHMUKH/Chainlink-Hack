var MainContract = artifacts.require("./Message.sol")

module.exports = function(deployer){
    deployer.deploy(MainContract);
}