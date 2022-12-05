# 第 88 场双周赛

 
:::info
参加时间：2022-10-01
:::

## [6212. 删除字符使频率相同](https://leetcode.cn/problems/remove-letter-to-equalize-frequency/)

### 难度

简单

### 思路

这次可能很多同学都被困到了第一题，下图就表明了一切，一道简单难度的题目通过率大概是 16 %：

![CleanShot 2022-10-01 at 23.53.05@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a10ac99e46284b858eb085128a095926~tplv-k3u1fbpfcp-watermark.image?)

我做第一题也是失败了 4 次，最后放弃直接选择了暴力求解：思路就是先统计每一个字符出现的次数，依次实验删除掉哪一个数字的次数是相同的。只要有一个情况是可以的，直接返回 `true`。

```js
var equalFrequency = function(word) {
    let times = new Array(26).fill(0)
    
    for (let char of word) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0)
        times[index]++
    }
    times = times.filter(i => i !== 0)
    for (let i = 0; i < times.length; i++) {
        let newTimes = [...times]
        newTimes[i]--
        newTimes = newTimes.filter(i => i !== 0)
        if (newTimes.filter(i => i === newTimes[0]).length === newTimes.length) {
            return true
        }        
    }
    
    return false
};
```

## [6197. 最长上传前缀](https://leetcode.cn/problems/longest-uploaded-prefix/)

### 难度
中等

### 思路

这道题比起第一道题就简单很多了。这道题没有考什么算法，重点是读懂题意，顺着题意写下来即可。

### 题解
```js
/**
 * @param {number} n
 */
var LUPrefix = function(n) {
    this.index = 0
    this.uploadFlag = new Array(n + 1).fill(0)
};

/** 
 * @param {number} video
 * @return {void}
 */
LUPrefix.prototype.upload = function(video) {
    this.uploadFlag[video] = 1
};

/**
 * @return {number}
 */
LUPrefix.prototype.longest = function() {
    while(this.index < this.uploadFlag.length - 1 && this.uploadFlag[this.index + 1] !== 0 ) {
        this.index++
    }
    
    return this.index
};
```

## [6213. 所有数对的异或和](https://leetcode.cn/problems/bitwise-xor-of-all-pairings/)

### 难度
中等

### 思路

这道题算是比较有趣，不过也没有考什么算法只是，是一个找规律题。题意是给定我们两个数组让我们做异或。

我们知道，异或自己本身是 0，同时多个操作是可以交换顺序的，也就是说，如果 nums1 是偶数，比如 `[1, 2]`，按照题目的要求做异或，有：

```bash
1 ^ nums2[0] ^ 1 ^ nums2[1] ^ ...
2 ^ nums2[0] ^ 2 ^ nums2[1] ^ ...
.... 后面是 nums1 的每一项分别与 nums2 做异或
```

通过交换顺序可以转化为：

```bash
1 ^ 1 ^ ... ^ nums2[0] ^ nums2[1] ^ ...
2 ^ 2 ^ ... ^ nums2[0] ^ nums2[1] ^ ...
^^^^^^^^^^^^^ 这有 nums2 长度个 nums1[i]，接着跟着一组 nums2 
```

最终的结果是每一行都进行异或操作。

假设 nums1 的长度为偶数，此时有偶数次 nums2 互相异或，则结果为 0，结果只剩下 nums1 自己互相异或。此时如果 nums2 为偶数，那最终结果是 0，如果是奇数，那最终结果还留下了一组 num1，最终可以把它本身异或。

```bash
1 ^ 1 ^ ......                       ^ 2 ^ 2 ^ ... ^ 0

       ^^^^^ 这有 nums2 长度个 nums1[i] 
```

### 题解

```js
var xorAllNums = function(nums1, nums2) {
    const len1 = nums1.length
    const len2 = nums2.length
    if (len1 % 2 === 0) {
        nums2 = []
    } 
    
    if (len2 % 2 === 0) {
        nums1 = []
    } 
    
    return nums1.concat(nums2).reduce((prev, cur) => {
        return prev ^ cur
    }, 0)
};
```
****
## [6198. 满足不等式的数对数目](https://leetcode.cn/problems/number-of-pairs-satisfying-inequality/)

这个题目要用到树状数组。大体思路如下：

1. 按照元素固有的顺序进行遍历，每次从树状数组里取看当前已经有多少个符号条件的数据
2. 把当前数据添加到数组数组

比较难以理解的是：

```
 for (let v of diffArray) {
    ans += t.query(lowerBound(copy, v + diff + 1))
    t.add(lowerBound(copy, v) + 1)
}
```
首先要明白树状数组每一项的含义是在此区间内有多少个小于等于当前值的。

第一行 ` ans += t.query(lowerBound(copy, v + diff + 1))`

我们的答案应该是加 [1, right] 这个区间内符合的数据，所以我们先求 target + 1 的 lowerBound，然后再减 1 就是 right 的值。由于我们树状数组下标是从 1 开始，所以需要查询的是 lowerBound(copy, v + diff + 1) - 1 + 1。简写为上面的形式。

其中 lowerBound 是二分查找大于等于一个值最小值。如果 `[1, 2, 2, 3]` 查找 2 返回索引 1，`[1, 2, 3, 4, 5]` 查找 6 返回索引 4。

第二行 ` t.add(lowerBound(copy, v) + 1)`

树状数组下标从 1 开始，所以要加 1.



```js
var numberOfPairs = function(nums1, nums2, diff) {
    const diffArray = []
    nums1.forEach((_, i) => {
        diffArray[i] = nums1[i] - nums2[i]
    })

    const copy = [...diffArray]
    copy.sort((a, b) => a-b)

    let ans = 0
    const t = new BIT(nums1.length + 1)

    for (let v of diffArray) {
        ans += t.query(lowerBound(copy, v + diff + 1))
        t.add(lowerBound(copy, v) + 1)
    }

    return ans
};

function lowerBound(a, target) {
    let left = 0, right = a.length;
    while (left < right) {
        var mid = Math.floor(left + (right - left) / 2);
        if (a[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

class BIT {

    constructor(n) {
        this.tree = new Array(n).fill(0);
    }

    add(x) {
        while (x < this.tree.length) {
            ++this.tree[x];
            x += x & -x;
        }
    }

    query(x) {
        let res = 0;
        while (x > 0) {
            res += this.tree[x];
            x &= x - 1;
        }
        return res;
    }
}
```
