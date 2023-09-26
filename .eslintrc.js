const { resolve } = require;
const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    env: {
        // 浏览器环境中的全局变量
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true
        //globals: true
    },
    root: true, // 标识当前配置文件为eslint的根配置文件，停止在父级目录中寻找
    extends: [
        'airbnb', // top ' airbnb
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended', // ESLint 内置规则官方推荐的共享配置
        'plugin:import/recommended',
        'plugin:react/jsx-runtime',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
        // 调整 TypeScript 通用语法和击球的共享设置来自 eslint:recommended
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'plugin:jest/recommended',
        'prettier'
    ], // 拓展
    //globals: {
    //    // 配置文件中通过globals 配置属性设置，对于每个全局变量键，将对应的值设置为 "writable"
    //    $: true,
    //    process: true,
    //    __dirname: true
    //},
    parser: '@typescript-eslint/parser', // 解析器，本解析器支持Ts
    parserOptions: {
        // 解析器配置选项
        ecmaFeatures: {
            jsx: true,
            requireConfigFile: false, //不要加引号 这样既可解决问题
            // lambda表达式
            arrowFunctions: true,
            // 解构赋值
            destructuring: true,
            // class
            classes: true,
            // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值
            defaultParams: true,
            // 块级作用域，允许使用let const
            blockBindings: true,
            // 允许使用模块，模块内默认严格模式
            modules: true
        },

        sourceType: 'module', // 代码支持es6，使用module
        ecmaVersion: 12, // 指定es版本

        // 通过准备另一个文件，解析器将解析 npm 包文件，并且 VS Code 和这可以防止性能下降时链接和解析新文件失败。
        project: './tsconfig.json'
    },

    plugins: [
        'jest',
        'react',
        'unicorn',
        'import',
        'jsx-a11y',
        'react-hooks',
        'standard',
        'promise',
        '@typescript-eslint',
        'prettier'
    ], // 插件
    settings: {
        react: {
            version: '999.999.999'
            // version: 'detect' // 自动选择你已安装的版本
        },

        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json']
            },
            typescript: {
                directory: [resolve('./tsconfig.json')]
            }
        }
    },
    // 添加自己的规则
    rules: {
        // 非开发模式禁用debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'unicorn/filename-case': [
            ERROR,
            {
                cases: {
                    // 中划线
                    kebabCase: true,
                    // 小驼峰
                    camelCase: true,
                    // 下划线
                    snakeCase: false,
                    // 大驼峰
                    pascalCase: true
                }
            }
        ],

        'import/order': [
            'error',

            {
                groups: [['unknown', 'builtin', 'external']],

                'newlines-between': 'always'
            }
        ],

        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        'import/prefer-default-export': OFF,

        'import/no-unresolved': ERROR,
        'import/named': 0,

        'import/no-dynamic-require': OFF,

        'unicorn/import-style': OFF,
        'unicorn/no-null': OFF,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/no-process-exit': OFF,
        'unicorn/better-regex': ERROR,

        'unicorn/no-array-instanceof': WARN,
        'unicorn/no-for-loop': WARN,
        'unicorn/consistent-function-scoping': OFF, //关闭函数提升
        'unicorn/prefer-add-event-listener': [
            ERROR,
            {
                excludedPackages: ['koa', 'sax']
            }
        ],
        'unicorn/prefer-query-selector': ERROR,
        'unicorn/no-array-reduce': OFF,

        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/no-empty-function': WARN,
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-use-before-define': ERROR,
        '@typescript-eslint/no-unused-vars': WARN,
        'no-unused-vars': OFF,
        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/jsx-one-expression-per-line': OFF,
        'react/destructuring-assignment': OFF,
        'react/state-in-constructor': OFF,
        'react/require-default-props': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/prop-types': OFF,

        'react/function-component-definition': [
            2,
            {
                namedComponents: ['arrow-function', 'function-declaration'],
                unnamedComponents: 'arrow-function'
            }
        ],
        'jsx-a11y/click-events-have-key-events': OFF,
        'jsx-a11y/no-noninteractive-element-interactions': OFF,
        'jsx-a11y/no-static-element-interactions': OFF,
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: ['CustomInputLabel'],
                labelAttributes: ['label'],
                controlComponents: ['CustomInput'],
                depth: 3
            }
        ],
        //jsx中使用双引号
        'jsx-quotes': ['error', 'prefer-double'],
        'lines-between-class-members': [ERROR, 'always'],
        // 此选项为您的代码设置特定的标签宽度（默认关闭）
        // indent: ['error', 2, { MemberExpression: 1 }],
        indent: 0,
        'linebreak-style': [ERROR, 'unix'],
        // 强制使用一致的反勾号、双引号或单引号
        quotes: [2, 'single', 'avoid-escape'],
        // 配制单引号
        //quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'func-names': OFF,

        'max-classes-per-file': OFF,
        semi: [ERROR, 'always'], // 要求或禁止使用分号而不是 ASI
        'no-empty': OFF,
        'no-param-reassign': OFF,
        'no-unused-expressions': WARN,
        'no-plusplus': OFF,
        'no-console': OFF,
        'class-methods-use-this': ERROR,
        'jsx-quotes': [ERROR, 'prefer-single'],
        'global-require': OFF,
        'no-use-before-define': OFF,
        'no-restricted-syntax': OFF,
        'no-continue': OFF,
        'no-useless-constructor': 'off',
        //overrides: {
        //    'no-shadow': 'off',
        //    '@typescript-eslint/no-shadow': ['error', , { ignoreTypeValueShadow: true }]
        //},
        'spaced-comment': 0 // 要求或禁止注释中紧跟在 // 或 /* 后面的空格（默认关闭）
    },

    overrides: [
        {
            files: ['**/*.d.ts', '*.ts', '*.tsx', '**/*.spec.js', '**/*.spec.jsx'],
            env: {
                jest: true
            },
            rules: {
                'import/no-duplicates': OFF
            }
        },
        {
            files: ['scripts/**/*.ts'],
            rules: {
                'import/no-extraneous-dependencies': OFF
            }
        }
    ]
};
