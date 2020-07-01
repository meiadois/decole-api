module.exports = {
    "env": {
        "es2020": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "standard"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        quotes: [2, 'single'],
        camelcase: 0,
        '@typescript-eslint/camelcase': 'off',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error"
    }
}
