const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*", // Match any network id
      },
      sepolia: {
        provider: () => new HDWalletProvider({
        mnemonic: {
        phrase: ""
        },
        providerOrUrl: "https://eth-sepolia.g.alchemy.com/v2/BoX83v1qt3Xb36s8H4B0Bf-ZM5Vg0ABY"
        }),
        network_id: 11155111, // Sepolia's network ID
        gas: 4000000, // Adjust the gas limit as per your requirements
        gasPrice: 10000000000, // Set the gas price to an appropriate value
        confirmations: 2, // Set the number of confirmations needed for a transaction
        timeoutBlocks: 200, // Set the timeout for transactions
        skipDryRun: true // Skip the dry run option
        // pollingInterval: 1800000,
        // disableConfirmationListener: true
       }
    },
    compilers: {
      solc: {
        version: "0.8.0",
      },
    },
  };