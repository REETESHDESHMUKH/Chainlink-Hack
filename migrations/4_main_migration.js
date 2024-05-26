var MainContract = artifacts.require("./vrfFinal.sol")

module.exports = function(deployer){
    deployer.deploy(MainContract,39702719510306895156226795975925508954628559769060091587834131726821531013077n);
}