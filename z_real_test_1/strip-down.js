const fs = require('fs');

strip_date('2015_01.csv');
strip_date('2015_02.csv');

function strip_date(file_name) {

	const raw_data = fs.readFileSync(file_name, 'utf8');
	
	const raw_string_arrs = raw_data.split('\n');

	const raw_arrs_arrs = [];
	for (let row of raw_string_arrs) {
		raw_arrs_arrs.push(row.split(','));
	};
	// console.log(raw_arrs_arrs)
	for (let i = 0; i < raw_arrs_arrs.length; i++) {
		raw_arrs_arrs[i] = move(raw_arrs_arrs[i], 18, 2);
	};
	// console.log(raw_arrs_arrs

	let stripped_arrs_arrs = [];
	let i = 1;
	for (let row of raw_arrs_arrs) {
		console.log(row)
		// strip first
		let interim_1_a = row.slice(2, 8);
		if (i === 0)console.log(interim_1_a)

		let interim_1_b = row.slice(14, 18);
		if (i === 0)console.log(interim_1_b)
		// strip others
		let interim_2 = row.slice(19, 21);
		if (i === 0)console.log(interim_2)
		// strip last
		// let interim_3 = row.slice(19, 21);
		// if (i === 0)console.log(interim_3)
		stripped_arrs_arrs.push(
			interim_1_a.concat(
				interim_1_b.concat(
					interim_2
				)
			)
		);
		i++
	};
	console.log(stripped_arrs_arrs)

	
	stripped_arrs_arrs.sort((function(index){
	    return function(a, b){
	        return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
	    };
	})(0)); // 2 is the index
	stripped_arrs_arrs = move(stripped_arrs_arrs, stripped_arrs_arrs.length-1, 0);
	console.log(stripped_arrs_arrs)

	const rows_joined = [];
	for (let row of stripped_arrs_arrs) {
		rows_joined.push(row.join(','));
	};
	const csvd = rows_joined.join('\n');

	fs.writeFileSync('./stripped_' + file_name, csvd);
};

function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}