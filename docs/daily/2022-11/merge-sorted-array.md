# 88. 合并两个有序数组
## 题目


[地址](https://leetcode.cn/problems/merge-sorted-array/)


## 时间


2022年11月11日


## 难度


简单


## 题解


```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    m--
    n--
    for (let i = nums1.length - 1; i >= 0; i--) {
        if (m < 0) {
            nums1[i] = nums2[n--]
        } else if (n < 0) {
            nums1[i] = nums1[m--]
        } else if (nums1[m] > nums2[n]) {
            nums1[i] = nums1[m--]
        } else {
            nums1[i] = nums2[n--]
        }
    }
};

```