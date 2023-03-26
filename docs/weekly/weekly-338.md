
# 第 338 场周赛

:::info
参加时间：2023-03-26
名次：1186 / 5594
:::

阔别很久，我又回来了，因为最近要面试。

## [6354. K 件物品的最大和](https://leetcode.cn/problems/k-items-with-the-maximum-sum/)

```js
var kItemsWithMaximumSum = function(numOnes, numZeros, numNegOnes, k) {
    if (k <= numOnes) {
        return k
    }
    
    if (k <= numOnes + numZeros) {
        return numOnes
    }
    
    return numOnes - (k - (numOnes + numZeros) )
};
```

## [6355. 质数减法运算](https://leetcode.cn/problems/prime-subtraction-operation/)

```js
var primeSubOperation = function(nums) {
    nums = [0, ...nums]
    
    const primes = getPrimes(1000)
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i-1]) {
            return false
        }
        
        nums[i] = nums[i] - nextPrime(primes, nums[i] - nums[i-1])
    }
    
    return true
};

// 小于 target 的第一个数
function nextPrime(arr, target) {
    let lo = -1;
    let hi = arr.length - 1
    
    while (lo < hi) {
        let mid = lo + Math.floor((hi - lo + 1) / 2)
        
        if (arr[mid] >= target) {
            hi = mid - 1
        } else {
            lo = mid
        }
    }
    
    if (lo === -1) {
        return 0
    } else {
        return arr[lo]
    }
}


function getPrimes(max) {
  const sieve = new Array(max + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (sieve[i]) {
      for (let j = i ** 2; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }

  const primes = [];
  for (let i = 2; i <= max; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }

  return primes;
}

```

## [6357. 使数组元素全部相等的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-all-array-elements-equal/)

```js
var minOperations = function(nums, queries) {
    nums.sort((a, b) => a - b)
    const preSum = [nums[0]]
    
    for (let i = 1; i < nums.length; i++) {
        preSum[i] = preSum[i-1] + nums[i]
    }
    
    
    const upper = (target) => {
        let lo = 0
        let hi = nums.length
        
        while (lo < hi) {
            let mid = lo + Math.floor((hi - lo) / 2)
            if (nums[mid] <= target) {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        
        return hi
    }
    
    return queries.map(query => {
        let ret = 0
        let mid = upper(query)
        
        let leftPart = 0
        if (mid - 1 >= 0) {
            leftPart = preSum[mid - 1] 
            ret += (query * mid - leftPart)
        }
        
        ret += (preSum[nums.length - 1] - leftPart - query * (nums.length - mid))
    
        return ret
    })
};

```
