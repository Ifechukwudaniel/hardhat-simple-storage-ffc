import { ethers, run, network }  from "hardhat";
import "@nomiclabs/hardhat-etherscan";

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("deploying contract ...");
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`deployed contract to :${simpleStorage.address}`);
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await verify(simpleStorage.address, []);
    }
    let currentValue = await simpleStorage.retrieve();
    console.log(`Current value ${currentValue}`);

    const transactionResponse = await simpleStorage.store(4);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value ${updatedValue}`);
}

async function verify(contractAddress:string, args: any[]) {
    console.log("Verifying Contract ....");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error:any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else console.log(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
