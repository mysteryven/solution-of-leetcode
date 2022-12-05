# 第 320 场周赛
 
:::info
参加时间：2022-11-20
:::

## [2475. 数组中不等三元组的数目](https://leetcode.cn/problems/number-of-unequal-triplets-in-array/)



简单


```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var unequalTriplets = function(nums) {
    let count = 0
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            if (nums[i] !== nums[j]) {
                for (let k = j + 1; k < nums.length; k++) {
                    if (nums[k] !== nums[j] && nums[k] !== nums[i]) {
                        count++
                    }
                }
            }
        }
    }
    
    return count
};
```


## [2476. 二叉搜索树最近节点查询](https://leetcode.cn/problems/closest-nodes-queries-in-a-binary-search-tree/)

```js
var closestNodes = function(root, queries) {
    const arr = []
    const getOrder = (node) => {
        if (node === null) {
            return
        }
        getOrder(node.left)
        arr.push(node.val)
        getOrder(node.right)
    }
    
    getOrder(root)
    const ret = []
    
    for (let query of queries) {
        ret.push([arr[findLower(arr, query)] ?? -1, arr[findUpper(arr, query)] ?? -1])        
    }
    
    return ret
};

// 小于等于 target 的最大值
function findLower(arr, target) {
    let i = -1
    let j = arr.length - 1
    
    while(i < j) {
        let mid = i + Math.floor((j - i + 1) / 2)
        if (arr[mid] <= target) {
            i = mid
        } else {
            j = mid - 1
        }
    }
    
    return i
}

// 大于等于 target 的最小值
function findUpper(arr, target) {
    let i = 0
    let j = arr.length
    
    while (i < j) {
        let mid = i + Math.floor((j - i) / 2)
        if (arr[mid] < target) {
            i = mid + 1
        } else {
            j = mid
        }
    }
    
    return j === arr.length ? -1 : j
}
```
