# 第 319 场双周赛

又是一名三题选手，目前还没做出来依次最后一题。上周只做出来了两题，太耻辱了，就没有录。
 
:::info
参加时间：2022-11-13
:::

## [6233. 温度转换](https://leetcode.cn/problems/convert-the-temperature/)


简单


```js
/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function(celsius) {
    const convert1 = () => {
        return ((celsius * 100 + 27315) / 100)
    }    
    
    const convert2 = () => {
        return ((celsius * 100 * 1.8 * 100 + 32 * 10000) / 10000)
    }
    
    return [convert1(), convert2()]
};
```


## [6234. 最小公倍数为 K 的子数组数目](https://leetcode.cn/problems/number-of-subarrays-with-lcm-equal-to-k/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayLCM = function(nums, k) {
    let ans = 0
    let nextKIndex = 0
    
    while (true) {
        while(nextKIndex <= nums.length && nums[nextKIndex] !== k) {
            nextKIndex++
        }
        if (nextKIndex >= nums.length) {
            break
        }
        
        let i = nextKIndex, j = nextKIndex
        while(i > 0 && k % nums[i-1] === 0) {
            i--
        }
        
        while (j < nums.length - 1 && nums[j+1] != k && k % nums[j+1] === 0) {
            j++
        }
        
        ans += (nextKIndex - i + 1)
        ans += (j - nextKIndex) * (nextKIndex - i + 1)
        
        nextKIndex++
    }
    
    return ans
};
```

[6235. 逐层排序二叉树所需的最少操作数目](https://leetcode.cn/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimumOperations = function(root) {
    let ans = 0
    let queue = [root]
    let nextQueue = []
    
    while(queue.length > 0) {  
        queue.forEach(node => {
            if (node.left) {
                nextQueue.push(node.left)
            }
            if (node.right) {
                nextQueue.push(node.right)
            }
        })
        
        
        const vals = nextQueue.map(i => i.val);
        const indexList = new Array(vals.length).fill(0).map((i, index) => index).sort((a, b) => vals[a] - vals[b])
        const sortMap = new Map()
        
        for (let i = 0; i < vals.length; i++) {
            sortMap.set(vals[i], indexList[i])
        }
        
        
        for (let i = 0; i < vals.length; i++) {
            let sortIndex = sortMap.get(vals[i])
            while (i !== sortIndex) {
                [vals[i], vals[sortIndex]] = [vals[sortIndex], vals[i]]
                ans++
                sortIndex = sortMap.get(vals[i])
            }
        }
        
        queue = nextQueue
        nextQueue = []
    }
    
    return ans
};

```