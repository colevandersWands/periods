const fs = require('fs');

const raw_data = fs.readFileSync('../data/d4g_malaria_explore.csv', 'utf8');

const split_raw = raw_data.split('\n');

const split_add_column = split_raw.map((a) => a + ",0");

const extra_rowed = split_add_column.join('\n');

fs.writeFileSync('../data/d4g_malaria_explore_plus.csv', extra_rowed);

