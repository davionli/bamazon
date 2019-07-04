var Table = require('cli-table');

 

function printMyTable(data) {
    var header = [];
    var keys = Object.keys(data[0]);
    keys.forEach(e=> {
        header.push(e);
    });
    var table = new Table({ head: header });
    for (var i=0; i<data.length; i++) {
        var row = [];
        var values = Object.values(data[i]);
        values.forEach(e=> {
            row.push(e);
        });
        table.push(row);
    }
    
    console.log(table.toString());
}

module.exports = printMyTable;