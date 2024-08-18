// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote{
    //构建投票人的结构体
    struct Voter{
        uint256 amount;//票数
        bool isVoted ;//是否投过票
        address delegator;//代理人ID
        uint256 targetId;//目标ID

    }
    //投票人集合
    mapping(address => Voter)public voters;

    //投票看板
    struct Board{
        string name;
        uint256 totalAmount;
    }

    //主持人信息
    address public host;

    //主题集合
    Board[] public board;

    constructor(string[] memory nameList){
        host=msg.sender;//合约部署者
        
        voters[host].amount = 1;
        
        for(uint256 i =0;i < nameList.length;i++){
            Board memory boardItem = Board(nameList[i],0);
            board.push(boardItem);
        }

    }
    event voteSuccess(string);

    //返回看板集合
    function getBoardInfo() public view returns(Board[] memory){
        return board;
    }

    //给一些地址投票权限
    function mandate(address[] memory addressList)public {
        //只有主持人可以调用
        require(msg.sender == host,"you have no right to call");
        for(uint i=0;i<addressList.length;i++){
            //如果改地址已经投过票，不做处理
            if(!voters[addressList[i]].isVoted){
                voters[addressList[i]].amount = 1;
            }
        }
    }

    function vote(uint256 targetId) public {
        Voter storage sender = voters[msg.sender];
        require(sender.amount != 0,"have no right to vote");//确保消息发送者有权投票
        require(!sender.isVoted, "has voted");
        sender.isVoted = true;
        sender.targetId = targetId;
        board[targetId].totalAmount += sender.amount;
        emit voteSuccess("sucess");
    }
    //将投票权委托
    function delegate(address to)public {
        //获取委托人的地址
        Voter storage sender= voters[msg.sender];
        //如果委托人自己已经投过票了
        require(!sender.isVoted,"have voted");
        //不能委托自己
        require(msg.sender!= to,unicode"不能委托自己");
        //避免循环委托
        while (voters[to].delegator!= address(0)){
            to= voters[to].delegator;//如果to的代理人不是零地址，就把to的代理人设置为他自己防止循环
            require(to==msg.sender,unicode"不能循环代理 ");
        }
        //授权：
        sender.isVoted = true;
        sender.delegator = to;
        //代理人数据的修改
        Voter storage delegater_ = voters[to];
        if(delegater_.isVoted){
            board[delegater_.targetId].totalAmount += sender.amount;

        }else{
            delegater_.amount += sender.amount;
        }

    }
}


