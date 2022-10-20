# 322. 零钱兑换
## 题目


[地址](https://leetcode.cn/problems/coin-change/)


## 时间


2022年10月20日


## 难度


中等


## 题解

定义好状态：dp[i][j] 表示，从 0 —— i-1 位的硬币中选出值等于 j，最小硬币需要几个。

此时 d[0][j] 是不可能的，不可能一个硬币也不选就凑出 值来，所以 d[0][j] 初始化为一个特殊值  

d[i][0] 代表从硬币中选出值等于 0，那就一个硬不选就可以啦。

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const dp = Array.from({length: coins.length + 1}, () => new Array(amount + 1).fill(amount + 1))
    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = 0
    }
    
    for (let i = 1; i < dp.length; i++) {
        const coin = coins[i-1]
        for (let j = 1; j < dp[i].length; j++) {
            dp[i][j] = dp[i-1][j]
            for (let k = 1; k * coin <= j; k++) {
                dp[i][j] = Math.min(dp[i][j], dp[i-1][j - k * coin] + k)
            }
            
        }
    }
    
    const maxValue = dp[dp.length - 1][amount]
    return maxValue > amount ? -1 : maxValue
};

```