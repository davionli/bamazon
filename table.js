var Table = require('cli-table');

function printMyTable(data) {
    var header = [];
    var keys = Object.keys(data[0]);
    keys.forEach(e=> {
        header.push(e);
    });
    var table = new Table({head: header, chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }, style: {'padding-left': 1, 'padding-right': 1, head: ['cyan'], border: ['white'], compact: false}});
    for (var i=0; i<data.length; i++) {
        var row = [];
        var values = Object.values(data[i]);
        values.forEach(e=> {
            row.push(e);
        });
        table.push(row);
    }
    console.log(table);
    console.log(table.toString());
}

module.exports = printMyTable;