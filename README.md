# subconfig
Browserify transform to substitute [config](https://github.com/lorenwest/node-config) variables using underscore templates.

## Installation
```
$ npm install subconfig
```
Note that you must also install [config](https://github.com/lorenwest/node-config) package:
```
$ npm install config
$ mkdir config
$ $EDITOR config/default.js
```
## Usage

To be able to write in your client-side code, say, `var socket = Primus('<%= ServerAddress %>')`, do
```shell
$ browserify -t subconfig app.js > bundle.js
```

To use custom prefix (`<%= conf.ServerAddress %>`):
```shell
$ browserify -t [ subconfig -p conf ] app.js > bundle.js
```
or
```shell
$ browserify -t [ subconfig --prefix conf ] app.js > bundle.js
```

Export `NODE_ENV=production` environment variable to switch to production config.

## License
MIT
