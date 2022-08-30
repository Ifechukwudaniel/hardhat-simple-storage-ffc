import { assert, expect }  from "chai";
import { ethers } from "hardhat";
import {SimpleStorage,SimpleStorage__factory} from '../typechain-types'

describe("Simple Storage", () => {
    let simpleStorageFactory:SimpleStorage__factory;
    let simpleStorage:SimpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
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

    it("should  add person and favorite number", async () => {
        let name = "daniel";
        let number = "4";
        let addPersonTransaction = await simpleStorage.addPerson(name, number);
        addPersonTransaction.wait(1);
        let favoriteNumber = await simpleStorage.nameToFavoriteNumber(name);
        expect(favoriteNumber.toString()).equal(number);
    });
});
