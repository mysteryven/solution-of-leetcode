
# 第 328 场周赛
 
:::info
参加时间：2022-01-15  
名次：2172 / 4776	
:::


## [6291. 数组元素和与数字和的绝对差](https://leetcode.cn/problems/difference-between-element-sum-and-digit-sum-of-an-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function(nums) {
    let sumFn = (prev, cur) => prev + cur
    let sum = nums.reduce(sumFn, 0);
    let digitSum = nums.reduce((prev, cur) => {
        return prev + String(cur).split('').map(i => +i).reduce(sumFn, 0)
    }, 0)
    
    return Math.abs(sum - digitSum)
};
```


## [6292. 子矩阵元素加 1](https://leetcode.cn/problems/increment-submatrices-by-one/)

```js
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function(n, queries) {
    let ret = Array.from({length: n}, () => new Array(n).fill(0));
    
    queries.forEach(([r1, c1, r2, c2]) => {
        for (let i = r1; i <= r2; i++) {
            for (let j = c1; j <= c2; j++) {
                ret[i][j]++
            }
        }  
    })
    
    return ret
};
```

上面我其实用了暴力解法，用例没有大数据量侥幸通过了，下面用二维差分做一下：

```js
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function(n, queries) {
    const diff = Array.from({length: n + 1}, () => new Array(n + 1).fill(0));
    
    for (const [r1, c1, r2, c2] of queries) {
        diff[r1][c1] += 1;
        diff[r1][c2 + 1] -= 1;
        diff[r2 + 1][c1] -= 1;
        diff[r2 + 1][c2 + 1] += 1        
    }
    
    const ans = Array.from({length: n}, () => new Array(n).fill(0))
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let a = i == 0 ? 0 : ans[i-1][j];
            let b = j === 0 ? 0 : ans[i][j-1]
            let c = i === 0 || j === 0 ? 0 : ans[i-1][j-1]
            ans[i][j] = a + b - c + diff[i][j]
        }
    }
    
    return ans;
};
```

## [6293. 统计好子数组的数目](https://leetcode.cn/problems/count-the-number-of-good-subarrays/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function(nums, k) {
    let map = new Map()
    let current = 0
    let ret = 0
    let i = 0
    
    for (let j = 0; j < nums.length; j++) {
        let times = map.get(nums[j]) || 0
        map.set(nums[j], times + 1);
        current -= times * (times - 1) / 2
        current += (times + 1) * times / 2
        
        if (current >= k) {
            ret += (nums.length - j)
            
            while (i < j) {
                let times = map.get(nums[i])
                map.set(nums[i], times - 1);
                current -= times * (times - 1 ) / 2
                current += (times - 1) * (times - 2) / 2
                i++
                
                if (current >= k) {
                    ret += (nums.length - j)   
                } else {
                    break
                }
            }
        }
    }
    
    return ret;
};
```

