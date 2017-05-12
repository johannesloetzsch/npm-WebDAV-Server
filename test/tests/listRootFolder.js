var webdav = require('../../lib/index.js'),
    Client = require("webdav-fs")

module.exports = (test, options, index) => test('list root folder', _isValid =>
{
    function isValid(good, msg)
    {
        server.stop(() => {
            _isValid(good, msg);
        })
    }

    var server = new webdav.WebDAVServer();
    server.rootResource.addChild(new webdav.VirtualFile('file.txt'), e => {
        if(e)
        {
            isValid(false, e)
            return;
        }

        server.start(options.port + index);

        var wfs = Client(
            "http://127.0.0.1:" + (options.port + index)
        );

        wfs.readdir('/', (e, files) => {
            if(e)
                isValid(false, e);
            else
                isValid(files.length === 1 && files[0] === 'file.txt');
        })
    });
})