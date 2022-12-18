
# 第 324 场周赛
 
:::info
参加时间：2022-12-18
:::


## [6265. 统计相似字符串对的数目](https://leetcode.cn/problems/count-pairs-of-similar-strings/)

由于只包含小写字母，所以这道题好像用二进制做更好一点，存在哪一个字符就把二进制的位置为 1 。最后比较二进制相等。

```js
/**
 * @param {string[]} words
 * @return {number}
 */
var similarPairs = function(words) {
    let num = 0
    let count = 0
    
    words = words.map(w => Array.from(new Set(w.split(''))).sort().join(''))
    
    for (let i = 0; i < words.length - 1; i++) {
        for (let j = i+1; j < words.length; j++) {
            if (words[i] === words[j]) {
                count++
            }
        }
    }
    
    return count
};
```

## [6266. 使用质因数之和替换后可以取到的最小值](https://leetcode.cn/problems/smallest-value-after-replacing-with-sum-of-prime-factors/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var smallestValue = function (n) {
  const primes = find(n);
  let sum = 0

  while (true) {
    let tempN = n
    let i = 0
    while (tempN !== 1) {
      if (tempN % primes[i] === 0) {
        tempN /= primes[i]
        sum += primes[i]
        i = 0
      } else {
        i++
      }
    }

    if (sum === n) {
      return n
    }

    n = sum;
    sum = 0
  }
};

function find(n) {
  const isPrime = (v) => {
    if (v <= 1) return false;
    for (let i = 2; i * i <= v; ++i) {
      if (v % i == 0) return false;
    }

    return true;
  }
  const ret = []

  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) {
      ret.push(i)
    }
  }


  return ret
}
```


## [6267. 添加边使所有节点度数都为偶数](https://leetcode.cn/problems/add-edges-to-make-degrees-of-all-nodes-even/)

第一次遇到第三题是困难题。最后也没有做出来，少考虑了一种情况，非常可惜。（有两个奇数节点的时候，两边相连也有可能是可行解）

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var isPossible = function(n, edges) {
    const graph = new Map()
    
    for (const edge of edges) {
        const [a, b] = edge
        const resultA = graph.get(a) || new Set()
        const resultB = graph.get(b) || new Set()
        
        resultA.add(b)
        resultB.add(a)
        
        graph.set(a, resultA);
        graph.set(b, resultB)
    }
    
    let odd = 0
    let nodes = []
    for (const [key, value] of graph) {
        if (value.size % 2 !== 0) {
            odd ++
            nodes.push(key)
        }
    }
    
    if (odd > 4 || odd === 3) {
        return false
    }
    
    if (odd === 0) {
        return true
    }
    
    const [x, y, z, w] = nodes;
    
    if (nodes.length === 2) {
        const aa = graph.get(x)
        const bb = graph.get(y)
        if (!aa.has(y)) {
            return true
        }
        
        for (let [k, v] of graph) {
            if (k !== x && k !== y && !aa.has(k) && !bb.has(k)) {
                return true
            }
        }
        
        return false
    }
    
    return test(graph, x, y, z, w) ||  test(graph, x, z, y, w) || test(graph, x, w, y, z) 
    
    
};

function test(graph, x, y, z, w) {
    return !(graph.get(x).has(y)) && !(graph.get(z).has(w))
}
```
