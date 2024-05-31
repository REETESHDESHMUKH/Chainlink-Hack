const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(
        "c5b7b260e0946e90d06a3342f6c60586aa1dc2e4a8df37fbc6907e93d5b6e0d4",
        "https://eth-sepolia.g.alchemy.com/v2/ZL4q030pLIfQUEc_XDhG1NQH6ocmjZfD"
      ),
      network_id: 11155111, // Sepolia's network ID
      gas: 4000000, // Adjust the gas limit as per your requirements
        gasPrice: 10000000000, // Set the gas price to an appropriate value
        // confirmations: 2, // Set the number of confirmations needed for a transaction
        timeoutBlocks: 800, // Set the timeout for transactions
      skipDryRun: true // Skip the dry run option
        // pollingInterval: 1800000,
        // disableConfirmationListener: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.24",
    },
  },
};
