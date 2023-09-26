declare const _extends: string[];
export { _extends as extends };
export declare namespace env {
  const browser: boolean;
  const commonjs: boolean;
  const es6: boolean;
  const node: boolean;
}
export declare namespace globals {
  const $: boolean;
  const process: boolean;
  const __dirname: boolean;
}
export declare const parser: string;
export declare namespace parserOptions {
  namespace ecmaFeatures {
    const jsx: boolean;
    const modules: boolean;
  }
  const sourceType: string;
  const ecmaVersion: number;
}
export declare const plugins: string[];
export declare const settings: {
  'import/ignore': string[];
  react: {
    version: string;
  };
};
export declare const rules: {
  quotes: (string | number)[];
  'no-console': number;
  'no-debugger': number;
  'no-var': number;
  semi: string[];
  'no-irregular-whitespace': number;
  'no-trailing-spaces': number;
  'eol-last': number;
  'no-unused-vars': string;
  '@typescript-eslint/no-unused-vars': string[];
  'no-case-declarations': number;
  'no-underscore-dangle': number;
  'no-alert': number;
  'no-lone-blocks': number;
  'no-class-assign': number;
  'no-cond-assign': number;
  'no-const-assign': number;
  'no-delete-var': number;
  'no-dupe-keys': number;
  'use-isnan': number;
  'no-duplicate-case': number;
  'no-dupe-args': number;
  'no-empty': number;
  'no-func-assign': number;
  'no-invalid-this': number;
  'no-redeclare': number;
  'no-spaced-func': number;
  'no-this-before-super': number;
  'no-undef': number;
  'no-return-assign': number;
  'no-script-url': number;
  'no-use-before-define': number;
  'no-extra-boolean-cast': number;
  'no-unreachable': number;
  'comma-dangle': number;
  'no-mixed-spaces-and-tabs': number;
  'prefer-arrow-callback': number;
  'arrow-parens': number;
  'arrow-spacing': number;
  camelcase: number;
  'jsx-quotes': (string | number)[];
  'react/display-name': number;
  'react/forbid-prop-types': (number | {
    forbid: string[];
  })[];
  'react/jsx-boolean-value': number;
  'react/jsx-closing-bracket-location': number;
  'react/jsx-curly-spacing': (number | {
    when: string;
    children: boolean;
  })[];
  'react/jsx-key': number;
  'react/jsx-no-bind': number;
  'react/jsx-no-duplicate-props': number;
  'react/jsx-no-literals': number;
  'react/jsx-no-undef': number;
  'react/jsx-pascal-case': number;
  'react/jsx-sort-props': number;
  'react/jsx-uses-react': number;
  'react/jsx-uses-vars': number;
  'react/no-danger': number;
  'react/no-did-mount-set-state': number;
  'react/no-did-update-set-state': number;
  'react/no-direct-mutation-state': number;
  'react/no-multi-comp': number;
  'react/no-set-state': number;
  'react/no-unknown-property': number;
  'react/prefer-es6-class': number;
  'react/prop-types': number;
  'react/react-in-jsx-scope': string;
  'react/self-closing-comp': number;
  'react/sort-comp': number;
  'react/no-array-index-key': number;
  'react/no-deprecated': number;
  'react/jsx-equals-spacing': number;
};
