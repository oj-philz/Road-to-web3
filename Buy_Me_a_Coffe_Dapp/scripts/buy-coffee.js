const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    console.log(`Address ${addresses[i]} balance: `, await getBalance(addresses[i]));
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const coffeeContract = await BuyMeACoffee.deploy();

  await coffeeContract.deployed();
  console.log(`Deployed contract address: ${coffeeContract.address}`);

  const addresses = [owner.address, tipper.address, coffeeContract.address];
  console.log("== start ==");
  await printBalances(addresses);

  const tip = {value: hre.ethers.utils.parseEther("0.003")};
  await coffeeContract.connect(tipper).buyCoffee("Henry", "Awesome services!!", tip);
  await coffeeContract.connect(tipper).buyCoffee("Sasa", "Awesome services!!", tip);
  await coffeeContract.connect(tipper).buyCoffee("Chris", "Awesome services!!", tip);

  console.log("== bought coffee ==");
  await printBalances(addresses);

  if (coffeeContract.balance !== "0.0") {
    console.log("withdrawing funds..")
    const withdrawTxn = await coffeeContract.withdrawTips();
    await withdrawTxn.wait();
  }

  console.log("== withdraw tips ==");
  await printBalances(addresses);

  console.log("== memos ==");
  const memos = await coffeeContract.getMemos();
  printMemos(memos);

  console.log("==changing withdrawal address");
  console.log(`Previous owner: ${owner.address}`);
  await coffeeContract.connect(owner).updateAddress(tipper3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
