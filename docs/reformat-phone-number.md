# 1694. 重新格式化电话号码 

## 时间

2022年10月01日

## 题目

[地址](https://leetcode.cn/problems/reformat-phone-number/)

## 解答

```js
/**
 * @param {string} number
 * @return {string}
 */
var reformatNumber = function(number) {
    number = number.replace(/ |\-/g, '')     
    
    let remain = number.length
    let i = 0;
    const ans = []
    while (remain > 0) {
        if (remain > 4) {
            ans.push(number.slice(i, i + 3))
            remain -= 3
            i += 3
        } else if (remain === 4) {
            ans.push(number.slice(number.length - 4, number.length - 2))
            remain -= 2
            i += 2
        } else if (remain === 3) {
            ans.push(number.slice(number.length - 3, number.length))
            remain -= 3
            i += 3
        } else {
            ans.push(number.slice(number.length - 2, number.length))
            remain -= 2
            i += 2
        }
    }
    return ans.join('-')
};
```