const { task } = require("hardhat/config");

task("block-number", "Print the current Block Number").setAction(
    ///
    async (taskArgs, hre) => {
        let blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Block number ${blockNumber}`);
    }
);

module.exports = {};
