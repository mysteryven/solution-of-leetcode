# 811. 子域名访问计数
## 题目


[地址](https: //leetcode.cn/problems/subdomain-visit-count/)


## 时间


2022年10月15日


## 难度


中等


## 题解

这几天都是抄的题解，所以没有更新，累了 ~

```js
var buildArray = function(target, n) {
    const res = [];
    let prev = 0;
    for (const number of target) {
        for (let i = 0; i < number - prev - 1; i++) {
            res.push("Push");
            res.push("Pop");
        }
        res.push("Push");
        prev = number;
    }
    return res;
};


```