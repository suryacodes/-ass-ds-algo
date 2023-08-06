/**
 * Finds the minimum difference between the sums of two subsets of the array.
 *
 * @param {number[]} nums - The input array of numbers.
 * @param {number} start - The starting index for recursion (default: 0).
 * @param {number[]} collect - An array to collect the indices of the current subset (default: []).
 * @returns {number} - The minimum difference between the sums of two subsets.
 */
var dfs = function (nums, start = 0, collect = []) {
  if (collect.length === nums.length / 2) {
    let sum1 = 0,
      sum2 = 0,
      j = 0;
    for (let i = 0; i < nums.length; i++) {
      collect[j] === i ? ((sum1 += nums[i]), j++) : (sum2 += nums[i]);
    }
    return Math.abs(sum1 - sum2);
  }

  let minDiff = Number.MAX_VALUE;
  for (let i = start; i < nums.length; i++) {
    const diff = dfs(nums, i + 1, [...collect, i]);
    minDiff = Math.min(minDiff, diff);
  }
  return minDiff;
};


console.log(dfs([3, 9, 7, 3]));  // 2
console.log(dfs([-36, 36])); //72
console.log(dfs([2, -1, 0, 4, -2, -9])); // 0






