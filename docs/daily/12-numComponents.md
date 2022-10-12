# 817. 链表组件 
## 题目

[地址](https://leetcode.cn/problems/linked-list-components/)


## 时间


2022年10月12日


## 难度

中等


## 题解


今天倒是很简单的一道题。

```js
/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function(head, nums) {
    const set = new Set(nums)
    let ans = 0
    
    while(head) {
        if (set.has(head.val)) {
            while(head !== null && set.has(head.val)) {
                head = head.next
            }
            ans ++
        } else {
            head = head.next
        }
    }
    return ans
};
```