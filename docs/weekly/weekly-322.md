# 第 322 场双周赛
 
:::info
参加时间：2022-12-04
:::

最近一直都是稳定三题，今天也不例外，打完上一场，分数是 1700。

这次排名是 1407/5085。

## [6253. 回环句](https://leetcode.cn/problems/circular-sentence/)


```js
/**
 * @param {string} sentence
 * @return {boolean}
 */
var isCircularSentence = function(sentence) {
    const list = sentence.split(" ")
    
    for (let i = 0; i < list.length; i++) {
        const j = (i === list.length - 1 ? 0 : i + 1);
        if (list[i][list[i].length - 1] !== list[j][0]) {
            return false
        }
    }
    
    return true
};
```

## [6254. 划分技能点相等的团队](https://leetcode.cn/problems/divide-players-into-teams-of-equal-skill/)

```js
/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function(skill) {
    const sum = skill.reduce((prev, cur) => prev + cur, 0)
    
    if (sum % (skill.length / 2) !== 0) {
        return -1
    }
    
    const eachSum = sum / (skill.length / 2);
    const map = new Map()
    let ret = 0
    
    for (let num of skill) {
        map.set(num, (map.get(num) || 0) + 1)
    }
    
    for (let num of skill) {
        const countNum = map.get(num)
        if (countNum === 0) {
            continue;
        }
        
        const target = eachSum - num
        const count = map.get(target)
        if (count) {
            ret += num * target
            map.set(target, count - 1)
            map.set(num, map.get(num) - 1)
        } else {
            return -1
        }
    }
    
    return ret
};
```

## [6255. 两个城市间路径的最小分数](https://leetcode.cn/problems/minimum-score-of-a-path-between-two-cities/)

这道题提交失败了一次。

```js
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function(n, roads) {
    const graph = new Map()
    
    let ans = Infinity;
    
    for (let road of roads) {
        const node1 = graph.get(road[0]) || []
        const node2 = graph.get(road[1]) || []
        
        node1.push({
            edge: road[1],
            weight: road[2]
        })
        
         node2.push({
            edge: road[0],
            weight: road[2]
        })
        
        graph.set(road[0], node1)
        graph.set(road[1], node2)
    }
    
    let maxVisitedCount = graph.get(n).length
    let currentVisitedCount = 0
    
    const bfs = (nodeIndex, visited) => {
        if (nodeIndex === n) {
            currentVisitedCount += 1
        }
        
        for (let neighbor of graph.get(nodeIndex)) {
            if (
                !visited.has(neighbor.edge)
            ) {
                visited.add(neighbor.edge)
                bfs(neighbor.edge, visited)
            }
        }             
    } 
    const visited = new Set()
    bfs(1, visited)
    
    for (let v of visited) {
        let temp = Math.min(...(graph.get(v).map(i => i.weight)))
        
        ans = Math.min(ans, temp)
    }
    
    return ans
};
```