module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    '@babel/plugin-transform-runtime',
    ['module-resolver', {
      alias: {
        "@controllers": "./src/controllers",
        "@models": "./src/models",
        "@validators": "./src/validators",
        "@services": "./src/services",
        "@utils": "./src/utils"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
