# subconfig
Browserify transform to substitute [config](https://github.com/lorenwest/node-config) variables using underscore templates.

## Usage

To be able to write in your client-side code, say, `var socket = Primus('<%= conf.ServerAddress %>')`, do
```shell
$ browserify -t subconfig app.js > bundle.js
```

To use custom prefix (`<%= new_prefix.ServerAddress %>`):
```shell
$ browserify -t [ subconfig -p new_prefix ] app.js > bundle.js
```
or
```shell
$ browserify -t [ subconfig --prefix new_prefix ] app.js > bundle.js
```

To access config variables without prefix (`<%= ServerAddress %>`):
```shell
$ browserify -t [ subconfig -p ] app.js > bundle.js
```

Export `NODE_ENV=production` environment variable to switch to production config.

## License
MIT
