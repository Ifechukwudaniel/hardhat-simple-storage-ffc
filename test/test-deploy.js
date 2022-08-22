const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
describe("Simple Storage", () => {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("should start with a favorite number of zero ", async () => {
        let currentValue = await simpleStorage.retrieve();
        const expectedNumber = "0";
        assert.equal(currentValue.toString(), expectedNumber);
        expect(currentValue.toString()).equal(expectedNumber);
    });

    it("should update  favorite number to 7 ", async () => {
        let transactionResponse = await simpleStorage.store(7);
        await transactionResponse.wait(1);
        let currentValue = await simpleStorage.retrieve();
        const expectedNumber = "7";
        assert.equal(currentValue.toString(), expectedNumber);
    });
});
