import Web3 from "web3";//从web3库中导入web3类（默认）
import VoteJSON from "../contract/Vote.json";//从合约编译生成的 JSON 文件中导入合约的 ABI 和其他信息(默认)
const useWeb3 = () => {//定义useWeb3函数，定义hooks
  const web3 = new Web3(window.ethereum);//实例化 Web3，并连接到用户的 Ethereum 钱包（如 MetaMask）。window.ethereum 是 MetaMask 提供的对象，Web3 会利用它来与以太坊网络进行交互。
  const contractAddrress = "0x9c6Ed4289406E10dE36d3c02EC8224d1BAA6E416";//在remix，以及本地ganache部署合约，获得合约地址
  const voteContract = new web3.eth.Contract(VoteJSON.abi, contractAddrress);//使用合约 ABI 和地址实例化合约对象，允许调用合约中的方法

  const getAccount = async () => {// 异步函数，用于获取当前连接的用户账户
    const accounts = await web3.eth.requestAccounts();// 请求用户的以太坊账户，并返回一个 Promise 对象。
    return accounts[0];// 返回账户列表中的第一个账户
  };

  return {//返回一个对象，包含 Web3 实例、合约实例、合约地址和获取账户的函数
    web3,
    voteContract,
    contractAddrress,
    getAccount,
  };
};

export default useWeb3;//默认暴露useWeb3

// const { web3, voteContract, getAccount } = useWeb3();