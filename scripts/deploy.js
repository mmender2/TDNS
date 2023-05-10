const hre = require('hardhat')

async function main() {
    const Domains = await hre.ethers.getContractFactory('Domains')
    const domains = await Domains.deploy("tfuel")
    const domains2 = await Domains.deploy('gworld')
    const domains3 = await Domains.deploy('theta')

    await domains.deployed()
    await domains2.deployed()
    await domains3.deployed()

    console.log("Domain deployed to: ", domains.address)
    console.log("Domain deployed to: ", domains2.address)
    console.log("Domain deployed to: ", domains3.address)

}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})