# 第 327 场周赛
 
:::info
参加时间：2022-01-08
名次： 2486 / 4518	
:::



[2529. 正整数和负整数的最大计数](https://leetcode.cn/problems/maximum-count-of-positive-integer-and-negative-integer/)


```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function(nums) {
    let a = 0, b = 0;
    
    nums.forEach(num => {
        if (num > 0) {
            a++
        }
        if (num < 0) {
            b++
        }
    })
    
    return Math.max(a, b)
};
```

##[2530. 执行 K 次操作后的最大分数](https://leetcode.cn/problems/maximal-score-after-applying-k-operations/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function(nums, k) {
    const mpq = new MaxPriorityQueue();
    
    for (let num of nums) {
      mpq.enqueue(num)  
    };

    let ret = 0;
    
    for (let i = 0; i < k; i++) {
        let max = mpq.dequeue().element;
        ret += max;
        mpq.enqueue(Math.ceil(max / 3))
    }

    return ret
};
```
