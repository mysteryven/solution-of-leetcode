# 第 321 场双周赛
 
:::info
参加时间：2022-11-27
:::

## [6245. 找出中枢整数](https://leetcode.cn/problems/find-the-pivot-integer/)



简单


```js
/**
 * @param {number} n
 * @return {number}
 */
var pivotInteger = function(n) {
    const total = n * (n + 1) / 2
    
    let sum = 0
    
    for (let i = 1; i <= n; i++) {
        sum += i
        if (sum == total - sum + i) {
            return i
        }
    }
    
    return -1
};
```


## [6246. 追加字符以获得子序列](https://leetcode.cn/problems/append-characters-to-string-to-make-subsequence/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var appendCharacters = function(s, t) {

    let j = 0
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === t[j]) {
            j++
        } 
    }
    
    return t.length - j
};
```

[6247. 从链表中移除节点](https://leetcode.cn/problems/remove-nodes-from-linked-list/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function(head) {
    const dummyHead = new ListNode(Infinity, head)
    
    const removeNodesImpl = (node) => {
        if (node === null) {
            return [null, -1]
        }
        
        const [next, max] = removeNodesImpl(node.next)

        if (max > node.val) {
            return [next, max]
        } else {
            node.next = next;
            return [node, node.val]
        }
    }
    
    return removeNodesImpl(dummyHead)[0].next
};
```