export const config = {
  //ropsten USDC address
  address: '0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4',
  abi:  [
    'function gimmeSome() external',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
    'function transfer(address _to, uint256 _value) public returns (bool success)'
  ]
};
