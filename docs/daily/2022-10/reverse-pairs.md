# 剑指 Offer 51. 数组中的逆序对

结合双周赛 88 ，趁热打铁，再来一道树状数组的题目。

值得注意的是，`nums[i]`后面存储的是顺序。然后树状数组存储的是小于等于某个顺序有多少个值。

那查询的时候要 `nums[i] - 1`，因为 `nums[i]` 包含了等于。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    const copy = [...nums].sort((a, b) => a - b)
    let ans = 0

    for (let i = 0; i < copy.length; i++) {
        nums[i] = binarySearch(copy, nums[i]) + 1
    }

    const t = new BIT(nums.length + 1)

    for (let i = nums.length - 1; i >=0; i--) {
        ans += t.query(nums[i] - 1)
        t.update(nums[i])
    }

    return ans
};

function binarySearch(a, target) {
    let lo = 0; 
    let hi = a.length

    while (lo < hi) {
        let mid = Math.floor(lo + (hi - lo) / 2)
        if (a[mid] === target) {
            return mid
        } else if (a[mid] < target) {
            lo = mid + 1
        } else {
            hi = mid - 1;
        }
    }
    return lo
}

class BIT {
    constructor(n) {
        this.tree = new Array(n).fill(0)
    }

    lowBit(x) {
        return x & (-x)
    }
    query(index) {
        let sum = 0

        while(index > 0) {
            sum += this.tree[index]
            index -= this.lowBit(index)
        }

        return sum
    }

    update(index) {
        while(index < this.tree.length) {
            this.tree[index]++
            index += this.lowBit(index)
        }
    }
}
```