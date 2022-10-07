# 1800. 最大升序子数组和 
## 题目

[地址](https://leetcode.cn/problems/maximum-ascending-subarray-sum/)

## 时间

2022年10月07日

## 难度

简单

## 题解

用的思路就是滑动窗口，如果前一个比当前的大，那值要和前一个累加(窗口增加)，如果值没有前一个大，那累加值重置为当前值（窗口缩小）。

```js
var maxAscendingSum = function(nums) {
    let max = nums[0]
    let sum = nums[0]
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            sum += nums[i]
        } else {
            sum = nums[i]
        }
        
        max = Math.max(max, sum)
    }
    
    return max
};
```