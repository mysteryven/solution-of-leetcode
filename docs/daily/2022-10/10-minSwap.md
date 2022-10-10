# 801. 使序列递增的最小交换次数
## 题目


[地址](https://leetcode.cn/problems/minimum-swaps-to-make-sequences-increasing/)


## 时间


2022年10月10日


## 难度


困难


## 题解

这道题目让我自己写，还真写不出来。主要的思路就是别多想，只想今天和昨天。
今天可能有两个状态，今天换与今天不换。然后在满足两个大条件下推导今天的值。

```js
// nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]
// nums1[i] ? nums2[i-1] && nums2[i] > nums1[i-1]
```

```js
var minSwap = function(nums1, nums2) {
   
    // 前一个位置交换
    const len = nums1.length
    const dp = new Array(len).fill(0).map(() => [Infinity, Infinity])
    dp[0] = [0, 1]
    
    for (let i = 1; i < len; i++) {
        if (nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]) {
            dp[i][0] = dp[i-1][0]
            dp[i][1] = dp[i-1][1] + 1
        } 
        
        if (nums1[i] > nums2[i-1] && nums2[i] > nums1[i-1]) {
            dp[i][0] = Math.min(dp[i][0], dp[i-1][1])
            dp[i][1] = Math.min(dp[i][1], dp[i-1][0] + 1)
        }
    }
    
    return Math.min(dp[len-1][0], dp[len-1][1])
};
```