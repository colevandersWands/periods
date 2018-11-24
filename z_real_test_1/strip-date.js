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

	const dateless_arrs_arrs = [];
	for (let row of raw_arrs_arrs) {
		dateless_arrs_arrs.push(row.slice(2));
	};

	const rows_joined = [];
	for (let row of dateless_arrs_arrs) {
		rows_joined.push(row.join(','));
	};
	const csvd = rows_joined.join('\n');

	fs.writeFileSync('./dateless_' + file_name, csvd);
};
