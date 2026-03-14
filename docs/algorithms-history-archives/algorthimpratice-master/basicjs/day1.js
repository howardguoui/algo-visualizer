/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const total = nums.length;
    let i,j
    for (i = 0; i < total -1; i++) {
        for (j = i + 1; j < total; j++) {
            let sum = nums[i]+nums[j] 
            if(sum === target) {
                return [i, j]
            }
        }
    }
};


// [3,2,4,1]

var twoSum = function(nums, target) {
    debugger;
    const map = {};
    let i;
    for(i = 0; i <nums.length; i++) {
        map[nums[i]] = i;
    }
    let counterpartIndex;
    for(let i = 0; i < nums.length - 1; i++) {
        counterpartIndex = map[target-nums[i]]
        if (counterpartIndex !==undefined && counterpartIndex !==i) {
            return [i, map[target -nums[i]]]
        }
    }
};