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

// Test cases
console.log(dfs([3, 9, 7, 3]));  // 2
console.log(dfs([-36, 36])); //72
console.log(dfs([2, -1, 0, 4, -2, -9])); // 0






/**
 * Evaluates the strength of a password
 * @param {string} password - The password to be evaluated.
 * @returns {number} The minimum number of changes required to make the password strong.
 */
function passwordChecker(password) {
  let needDigits = 1;
  let needLowercase = 1;
  let needUppercase = 1;
  let needsChange = 0;
  let canDeleteForChange = [0, 0, 0];

  let i = 0;
  while (i < password.length) {
    const v = password[i];
    if (v >= "0" && v <= "9") {
      needDigits = 0;
    } else if (v >= "a" && v <= "z") {
      needLowercase = 0;
    } else if (v >= "A" && v <= "Z") {
      needUppercase = 0;
    }

    if (i - 2 >= 0 && password[i - 2] === v && password[i - 1] === v) {
      let seqLen = 3;
      i += 1;
      while (i < password.length && password[i] === v) {
        seqLen += 1;
        i += 1;
      }
      needsChange += Math.floor(seqLen / 3);
      canDeleteForChange[seqLen % 3] += 1;
    } else {
      i += 1;
    }
  }

  const sz = password.length;
  const needsSpecial = needDigits + needLowercase + needUppercase;
  if (sz < 6) {
    return Math.max(needsSpecial, 6 - sz, needsChange);
  } else if (sz <= 20) {
    return Math.max(needsSpecial, needsChange);
  } else {
    const needsDeleted = sz - 20;
    let canDelete = needsDeleted;
    for (let i = 0; i <= 2; i++) {
      const toDelete = Math.min(canDeleteForChange[i] * (1 + i), canDelete);
      canDelete -= toDelete;
      needsChange -= Math.floor(toDelete / (1 + i));
    }
    needsChange -= Math.floor(Math.max(canDelete, 0) / 3);
    return needsDeleted + Math.max(needsChange, needsSpecial);
  }
}

// Test cases
console.log(passwordChecker("a")); // 5
console.log(passwordChecker("aA1")); // 3
console.log(passwordChecker("1337C0d3")); // 0



