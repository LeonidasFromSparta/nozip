module.exports = {

    parser: 'babel-eslint',
    env: {
        node: true,
        es6: true,
        jest: true
    },
    plugins: ['babel'],
    extends: ['eslint:recommended'],
    rules: {
        'semi': ['error', 'never'],
        'no-console': 'error',
        'no-debugger': 'error',
        'max-len': [2, 120, 4],
        'no-empty': ['error', { allowEmptyCatch: true }]
    }
}
