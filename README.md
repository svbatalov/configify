# configify
Browserify transform to substitute [config](https://github.com/lorenwest/node-config) variables using underscore templates.

## Usage

To be able to write in your client-side code, say, `<%= conf.ServerAddress %>`, do
```shell
$ browserify -t configify app.js > bundle.js
```

To use custom prefix (`<%= new_prefix.ServerAddress %>`):
```shell
$ browserify -t [ configify -p new_prefix ] app.js > bundle.js
```
or
```shell
$ browserify -t [ configify --prefix new_prefix ] app.js > bundle.js
```

To access config variables without prefix (`<%= ServerAddress %>`):
```shell
$ browserify -t [ configify -p ] app.js > bundle.js
```

Export `NODE_ENV=production` environment variable to switch to production config.

## License
MIT
