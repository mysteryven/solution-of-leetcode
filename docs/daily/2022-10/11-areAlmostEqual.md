# 1790. 仅执行一次字符串交换能否使两个字符串相等 

## 题目

[地址](https://leetcode.cn/problems/check-if-one-string-swap-can-make-strings-equal/)

## 时间

2022年10月11日

## 难度

简单

## 题解

这道题目就是按照逻辑写下来的，写得略显繁琐。我看了题解，三叶那种做法好棒，它借助了两个变量，分别存储了两个不同的index。然后最后面就是比较这两个 index 的情况。


```js
var areAlmostEqual = function(s1, s2) {
    let lastDiffIndex = -1
    let hasChangedOne = false

    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            if (hasChangedOne) {
                return false
            }
            
            if (lastDiffIndex === -1) {
                lastDiffIndex = i
            } else {
       
                if (s1[i] === s2[lastDiffIndex] && s2[i] === s1[lastDiffIndex]) {
                    hasChangedOne = true   
                    lastDiffIndex = -1
                } else {
                    return false
                }
            }
        }
    }
    
    return lastDiffIndex === -1
};
```