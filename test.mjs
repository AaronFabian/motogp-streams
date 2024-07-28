import bcrypt from 'bcrypt';

export async function hashingPassword(password) {
	const saltRounds = 10;

	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		throw new Error('Error hashing password: ' + error.message);
	}
}

console.log(await hashingPassword('123456789'));

const subsetA = function (arr) {
	const sortedArray = [...arr];
	// const sortedArray = [...arr].sort((a, b) => a - b);
	const set = new Set(sortedArray);
	const sanitizedArray = [...set.values()];

	const subset = (a = [], start = 0, attempt = 1, originalArrayLength = a.length) => {
		if (attempt > originalArrayLength) return [];
		if (a.length === 0) return [];

		let copyArr = [...a];

		// left
		copyArr.splice(start, 1);
		const left = [...copyArr];

		// reload
		copyArr = [...a];

		// right
		copyArr.splice(1, 0);
		const right = [...copyArr];

		console.log(left, right);
		const sumLeft = left.reduce((acc, cur) => acc + cur, 0);
		const sumRight = right.reduce((acc, cur) => acc + cur, 0);
		const currentVal = sumLeft > sumRight ? left : right;
		// console.log('comparing ' + currentVal);

		const newLeft = subset(left, 0, attempt + 1, originalArrayLength);
		const newRight = subset(right, 1, attempt + 1, originalArrayLength);
		const sumNewLeft = newLeft?.reduce((acc, cur) => acc + cur, 0) ?? 0;
		const sumNewRight = newRight?.reduce((acc, cur) => acc + cur, 0) ?? 0;
		const currentNewVal = sumNewLeft > sumNewRight ? newLeft : newRight;

		// comparing
		const returnLeft = currentVal.map((acc, cur) => acc + cur, 0);
		const returnRight = currentNewVal.map((acc, cur) => acc + cur, 0);

		return returnLeft > returnRight ? currentVal : currentNewVal;

		// recursive
		// const leftResult = subset(left);
		// const rightResult = subset(right);

		// console.log(leftResult);
		// console.log(rightResult);
		// console.log();
	};

	// base
	// console.log('base');
	// console.log(subset([1, 2, 3]));

	// console.log('left');
	// // left
	// console.log(subset([2, 3], 0, 2, 3));

	// console.log(subset([3], 0, 3, 3));

	// console.log(subset([], 0, 4, 3));

	// console.log('right');

	// // right
	// console.log(subset([2, 3], 1, 2, 3));

	// console.log(subset([2, 3], 1, 3, 3));

	// console.log(subset([2, 3], 1, 4, 3));

	// subset([1, 2, 3], 2, 0);
	// console.log();
	// return subset(sanitizedArray);

	return subset(sanitizedArray);
};

// console.log(subsetA([1, 2, 3])); // [6, 7]
// console.log(subsetA([3, 7, 5, 6, 2])); // [6, 7]

const segment = function (x, arr) {
	const windowConsecutive = [];
	const findMinimum = (start, a) => {
		const currentArr = [...a];

		if (currentArr.length < x) return;

		const windowMin = currentArr.splice(0, x);
		windowConsecutive.push(windowMin);

		findMinimum(start + 1, a.slice(1, undefined));
	};
	findMinimum(1, arr);

	let arrayMinimum = [];
	for (let i = 0; i < windowConsecutive.length; i++) {
		arrayMinimum.push(Math.min(...windowConsecutive[i]));
	}

	return Math.max(...arrayMinimum);
};

segment(4, [1, 5, 2, 1, 0, 2, 9]); // 1
segment(3, [10, 11, 12, 13, 14, 15, 16, 17]); // 15
segment(3, [3, 5, 2]); // 2
segment(4, [3, 2, 1, 9, 1, 5]); // 1
segment(6, [3, 2, 10, 9, 5, 5, 6, 6, 2, 9]); // 5

const smallestString = function (a) {
	const arr = [...a];

	let i = 0;
	while (i < arr.length) {
		let current = arr[i];

		for (let j = i + 1; j < arr.length; j++) {
			isSmallest = arr[j] < current;
			if (isSmallest) {
				current = arr[j];
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}

		i++;
	}

	return arr;
};
