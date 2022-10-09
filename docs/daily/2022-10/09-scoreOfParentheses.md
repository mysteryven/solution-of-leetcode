# 856. 括号的分数
## 题目


[地址](https://leetcode.cn/problems/score-of-parentheses/)


## 时间


2022年10月09日


## 难度


中等


## 题解

我觉得这个题还挺难的，饶了好一会。后来想通了，就是每次遇到右括号，都和前面进行一次累加。由于 左括号入的是 0，所以在一个括号组还没有匹配完成的时候，这次和前面累加没有效果。

```js
var scoreOfParentheses = function(s) {
    const stack = [0]
    
    for (let char of s) {
        if (char === '(') {
            stack.push(0)
        } else {
            const cur = stack.pop()
            stack.push(stack.pop() + Math.max(cur * 2, 1))
        }
    }
    
    return stack[stack.length - 1]
};
```