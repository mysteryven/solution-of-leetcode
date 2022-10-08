# 870. 优势洗牌 
## 题目


[地址](https://leetcode.cn/problems/advantage-shuffle/)


## 时间


2022年10月08日


## 难度


中等


## 题解

这道题目还有点意思，我也绕了接近半小时，做法还是田忌赛马的做法。题目的关键是假设 `num1` 的最小值比`num2` 的最小值要大，那就那这个比，反之，既然怎么比都比不过了，那拿这个最小值去和最大值去比。

```js
var advantageCount = function(nums1, nums2) {
    const length = nums2.length
    nums1.sort((a, b) => a - b)
    const ids = Array.from({length}, (_, index) => index)
    ids.sort((a, b) => nums2[a] - nums2[b])
    
    const ans = new Array(length)
    let left = 0;
    let right = length - 1
    
    for (let i = 0; i < length; i++) {

        // index 映射的是下一个 nums2 的索引
        const index = nums1[i] > nums2[ids[left]] ? left++ : right--
        
        ans[ids[index]] = nums1[i]
    }
    
    return ans
};
```