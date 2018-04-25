# Day 2
## _1_ Ethereum Account 生成过程：
**1** 生成 private key:

  椭圆曲线加密算法（EC）生成 **32 bytes** 的私钥
  
**2** private key --> public key：

  由 **private key** 生成 **64 bytes** 的 **public key**

**3** public key --> account address：

  对 **public key** 使用 Keccak-256 算法后， 截取后 **20 bytes** 作为账户地址
  * Keccak-256 != SHA-3

## _2_ 批量获取 Ethereum Account/Address
* 1 使用 **go-ethereum** 搭建私链
* 2 使用 [web3.js](https://web3js.readthedocs.io/en/1.0/index.html) 连接 **geth rpc** 
* 3 [code](https://github.com/oo7ww/MyPrivateChain/blob/master/account_generator.js)
