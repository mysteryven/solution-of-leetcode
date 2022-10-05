# 1784. 检查二进制字符串字段 

## 时间

2022年10月03日

## 题目

[地址](https://leetcode.cn/problems/check-if-binary-string-has-at-most-one-segment-of-ones/)

## 解答

```js
var checkOnesSegment = function(s) {
    return s.indexOf('01') === -1;
};
```