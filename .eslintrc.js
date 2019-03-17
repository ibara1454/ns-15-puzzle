const { resolve } = require("path");
const projectRoot = __dirname;
const appPath = "app";
const appFullPath = resolve(projectRoot, appPath);

module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "import"
    ],
    "rules": {
        'import/no-extraneous-dependencies': ['error', {
            "devDependencies": true, // devDependenciesのimportを許す
            "optionalDependencies": false,
            "packageDir": "./" // eslint-plugin-importのMonorepo対応
        }]
    },
    "settings": {
        // Since the format of config file of nativescript-dev-webpack is different from webpack
        // "import/resolver": "webpack" not works
        "import/resolver": {
            [__dirname + "/eslint-import-resolver-nativescript"]: {
                "config": {
                    "resolve": {
                        "extensions": [".vue", ".ts", ".js", ".scss", ".css"],
                        "alias": {
                            '~': appFullPath,
                            '@': appFullPath,
                            'vue': 'nativescript-vue'
                        }
                    }
                }
            }
        }
    }
};
