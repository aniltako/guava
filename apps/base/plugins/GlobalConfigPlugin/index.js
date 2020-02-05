class GlobalConfigPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Gobal Config Plugin', (
      stats
    ) => {
      console.log('Hello World!', process.env.AUTH0_DOMAIN)
    })
  }
}

module.exports = GlobalConfigPlugin;