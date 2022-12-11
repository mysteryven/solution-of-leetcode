# 第 322 场周赛
 
:::info
参加时间：2022-12-11
:::

今天这场打的稀烂，只答对了两题，并且第二题还错了 3 次

这次排名是 2520/4670， 这次参加的人好少，也不知道为什么。

##[6257. 删除每行中的最大值](https://leetcode.cn/problems/delete-greatest-value-in-each-row/)

```
/**
 * @param {number[][]} grid
 * @return {number}
 */
var deleteGreatestValue = function(grid) {
    let ret = 0
    
    for(let arr of grid) {
        arr.sort((a, b) => b-a)
    }
    
    for (let i = 0; i < grid[0].length; i++) {
        let max = -Infinity;
        for (let j = 0; j < grid.length; j++) {
            max = Math.max(max, grid[j][i])
        }
        ret += max
    }
    
    return ret
};
```

[6258. 数组中最长的方波](https://leetcode.cn/problems/longest-square-streak-in-an-array/)

```
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function(nums) {
    nums = Array.from(new Set(nums)).sort((a, b) => a - b)
    const dp = [1]
    const map = new Map()
    map.set(nums[0], 1)
    for (let i = 1; i < nums.length; i++) {
        const len = map.get(Math.sqrt(nums[i])) || 0
        dp[i] = Math.max(dp[i-1], len + 1)
        map.set(nums[i], len + 1)
    }
    
    return dp[nums.length - 1] === 1 ? -1 :  dp[nums.length - 1]
};
```