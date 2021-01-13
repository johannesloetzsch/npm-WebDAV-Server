import {v2 as webdav} from 'webdav-server'

const server = new webdav.WebDAVServer({
    port: 1900,
    rootFileSystem: new webdav.PhysicalFileSystem("./data")
});

server.rootFileSystem().addSubTree(server.createExternalContext(), {
    'subTree': {
      'fake': 'Content created at runtime :)',
      'placeholder': webdav.ResourceType.File
    }
}, (e) => {if(e) throw e;})

server.beforeRequest((ctx, next) => {
  console.log('>>', ctx.request.method, ctx.requested.uri, '>', ctx.response.statusCode, ctx.response.statusMessage)
  next()
})

server.start((s) => {
    const port = s.address().port;
    console.log('Ready on port', port);
});
