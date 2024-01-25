const { Web3 } = require('web3');
const { readFileSync } = require('fs');
const solc = require('solc');

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum node

const contractSource = readFileSync('./MyToken.sol', 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'MyToken.sol': {
            content: contractSource,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Log the entire output to see its structure
console.log('Compilation Output:', output);

// Check if the contract compilation was successful
if (!output.contracts || !output.contracts['MyToken.sol'] || !output.contracts['MyToken.sol']['MyToken']) {
    console.error('Contract compilation failed. Check the compilation output for errors.');
    process.exit(1); // Exit the script with an error code
}

const bytecode = output.contracts['MyToken.sol']['MyToken'].evm.bytecode.object;
const abi = output.contracts['MyToken.sol']['MyToken'].abi;

// ... rest of the deployment logic

const deployContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];

    const MyToken = new web3.eth.Contract(abi);

    const deployedContract = await MyToken.deploy({
        data: `0x${bytecode}`,
    }).send({
        from: deployer,
        gas: '4712388',
        gasPrice: '100000000000',
    });

    console.log('Contract deployed at:', deployedContract.options.address);
};

// Run the deployment script
deployContract();