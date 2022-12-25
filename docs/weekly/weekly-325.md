
# 第 324 场周赛
 
:::info
参加时间：2022-12-25
:::

可能由于疫情，也可能由于圣诞节，参加的人数很少，只有 3530 人。我今天也只做出来来第一题，是历史最坏成绩了。

最后排名是  1273/3550。

## [6269. 到目标字符串的最短距离](https://leetcode.cn/problems/shortest-distance-to-target-string-in-a-circular-array/)

```js
/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closetTarget = function(words, target, startIndex) {
    for (let i = 0; i < words.length; i++) {
        const index1 = (startIndex + i) % words.length
        const index2 = (startIndex - i + words.length) % words.length
        if (words[index1] === target || words[index2] === target) {
            return i
        }
    }
    
    return -1
};
```

第二题确实有点难，我想了一个小时也没有想到好的解决方案。后面的就自然放弃了。
