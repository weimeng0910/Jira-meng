module.exports = {
    roots: [
        '<rootDir>/src' // jest 扫描的目录
    ],
    //设置输出报告
    collectCoverage: true,
    //报告输出路径
    coverageDirectory: 'www/tests',
    // 测试运行环境 jest --init未加载依赖成功的话，必须报错缺少依赖，命令行提示手动加载依赖
    testEnvironment: 'jsdom',
    //setupFiles: ['./tests/jest.setup.ts'],
    // 匹配的文件会运行到测试库中,配置选项 testMatch 和 testRegex 不能一起使用。
    //testMatch: [
    //    '<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
    //    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    //],
    //对于jest而言，很多文件都是解析不了的，区分文件处理器
    //transform 使用正则表达式来指明什么文件该使用什么工具进行处理
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // 哪些文件需要用 ts-jest 执行
        '^.+.(css|less)$': 'jest-less-loader',
        '.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileTransformer.js' // fileTransformer.js处理jest图片路径
    },
    //testRegex 使用正则表达式，指明哪些是测试文件，这里的规则是，匹配 __test__ 文件夹下的 .test.tsx 或 .spec.tsx 文件
    testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$',
    //告诉jest要处理哪些文件,指明模块文件的后缀名，Jest 将会通过匹配这些后缀名来找到对应的模块
    moduleFileExtensions: ['jsx', 'js', 'tsx', 'ts', 'json'],
    // 对于打包工具，常常使用别名的方式优化项目导入路径
    // 例如webpack中
    /*
resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    '@fo': path.resolve(__dirname, '../app/components'),
    }
  */
    moduleNameMapper: {
        //   '@network': '<rootDir>/app/network',
        //   '@pages': '<rootDir>/app/pages',
        // '@': path.resolve(__dirname, '../app'),
        '@images/*(.*)$': '<rootDir>/images/$1',
        '@fo/*(.*)$': '<rootDir>/components/$1',
        '@common/*(.*)$': '<rootDir>/common/$1',
        '\\.(css|less)$': 'identity-obj-proxy' //fix bug when importing antd-mobile by babel dynamic error: Cannot use import statement outside a modul
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    }
};
