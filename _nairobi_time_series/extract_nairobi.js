const fs = require('fs');

const raw_data = fs.readFileSync('./kenya_vl_2015_2017_raw.csv', 'utf8');

// extract data & dates
const raw_string_all = raw_data.split('\n');
const raw_string_data = raw_string_all.slice(1);
const raw_row_arrays = raw_string_data.map((row) => row.split(','));
const nairobi_row_arrays = []; 
for (let row of raw_row_arrays) {
	if (row[1] === "Nairobi") {
		nairobi_row_arrays.push(row.slice(2));
	};
};

// extract titles
const column_titles_string = raw_string_all[0];
const column_titles_all = column_titles_string.split(',');
const column_titles_clean = column_titles_all.slice(2); 
// console.log(column_titles_clean)

// concatenate dates
//	** impure operation on nairobi_row_arrays
const dates = [];
for (let row of nairobi_row_arrays) {
	dates.push(row.pop().slice(0, -1) + '_' +  row.pop());
};

// transpose nairobi_row_arrays (modified in last step)
const nairobi_transpose = [];
for (let i = 0; i < nairobi_row_arrays[0].length; i++) {
	let new_arr = [];
	for (let j = 0; j < nairobi_row_arrays.length; j++) {
		new_arr.push(nairobi_row_arrays[j].pop());
	};
	nairobi_transpose.push(new_arr);
};

// create csv data
const nairobi_data_arr = [];
for (let i = 0; i < nairobi_transpose.length; i++) {
	const row_data = nairobi_transpose[i].join(',');
	const row = column_titles_clean[i] + ',' + row_data;
	nairobi_data_arr.push(row);
};

// attach column names
// *** impure nair
const column_dates = ',' + dates.join(',');
nairobi_data_arr.unshift(column_dates);

// complete csv string
const nairobi_csv_string = nairobi_data_arr.join('\n');

fs.writeFileSync('./nairobi_vl_2015_2017.csv', nairobi_csv_string);

