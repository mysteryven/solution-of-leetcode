# 927. 三等分

## 题目

[地址](https://leetcode.cn/problems/three-equal-parts/)

## 时间

2022年10月06日

## 难度

困难

## 题解

本来不想做这道题了，但是看到评论里说，字节、华为都遇到了这道题，于是我还是做了。

这道题的难点在于考虑好循环不变量：

```
[first, first + len), [second, second + len), [third, third + len)
```

由于要三等分，三个部分 1 的数目肯定是相等的，所以维护三个指针，分别指向三部分 1 最开始的位置，也就是 `first`、`second`、`third`。接着依次比较每一位，肯定要相等才行。

由于有前导 0，所以每一部分开始是前一部分 + 1，比如 `third` 其实不是最后一个区间开始，`second + len` 才是。

所以返回的结果是：`first + len -1`（第一个区间结束） 和 `second + len`（第三个区间开始）。


```js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var threeEqualParts = function(arr) {
    const sum = arr.reduce((prev, cur) => prev + cur, 0)
    
    if (sum % 3 !== 0) {
        return [-1, -1]
    }
    
    if (sum === 0) {
        return [0, 2]
    }
    
    const partial = sum / 3
    
    let first = 0, second = 0, third = 0, cur = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            if (cur === 0) {
                first = i
            } else if (cur === partial) {
                second = i
            } else if (cur === partial * 2) {
                third = i
            }
            
            cur++
        }
    }
    
    const len = arr.length - third
    if (first + len <= second && second + len <= third) {
        let i = 0
        
        while(i < len) {
            if (
                arr[first + i] !== arr[second + i] 
                || arr[second + i] !== arr[third + i]
            ) {
                return [-1, -1]
            }
            i++;
        }
        
        return [first + len - 1, second + len]
    }
    
    return [-1, -1]
};
```
