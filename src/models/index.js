var fs = require('fs');

var dir = 'src/models/';

function stripModels() {
    var modelList = ['account', 'cart', 'checkout'];
    var models = modelList.map(function(path) {
        var bigModel = '';
        var modelFiles = fs.readdirSync(dir + path);
        for (var i = 0; i < modelFiles.length; i++) {
            const modelFile = fs.readFileSync(dir + path + '/' + modelFiles[i]).toString();
            bigModel += modelFile.replace(/@\w+(.+)\r\n/g, ' ').replace(/import .+;\r\n/g, ' ');
            bigModel += "\n";
        }
        return bigModel;
    }).join('\n');

    fs.writeFileSync('./src/models.ts', models);

}


stripModels();

