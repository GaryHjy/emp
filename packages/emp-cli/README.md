# EMP CLI
> Base on Webpack5 Module Federation Micro Frontends solution!

English | [简体中文](./README-zh_CN.md)

## 🙋‍♂️ Quick start
+ Initialize EMP project： `npx @efox/emp-cli init`

## 📦 Install 
`npm i -g @efox/emp-cli` or `yarn global add @efox/emp-cli` 

## 👨‍🔧 Features update
[Change Log](CHANGELOG.md)

## 👨‍💻 Command 

+ `emp init` Initialize project
  + `emp init -t <remote-template-url>`
  >The list of custom templates needs to use JSON format ("template name": "git link")
  ```json
  {
    "react": "https://github.com/efoxTeam/emp-react-template.git",
    "vue2":"https://github.com/efoxTeam/emp-vue2-template.git"
  }
  ```
+ `emp dev` Development
  + `emp dev --hot` Hot update
  + `emp dev --open` Open the development page
  + `emp dev -rm` Pull the remote declaration file into the `src` directory
    + -rm --remote：The default is to get the remote address from the remoteBaseUrlList field in package.json in the format
    + ```javascript
      {
        "remoteBaseUrlList": [
          {
            "url": "https://com/index.d.ts",
            "name": "project.d.ts"
          }
        ]
      } 
      ```
+ `emp build` Build
  + `emp build --env` Specify the deployment environment
  + `emp build --analyze` Analyze
  + `emp build --ts` Build the production environment, generate `index.d.ts` to `dist` directory at the same time 
    + `emp build --ts -p [types path] -n [types name]` `types path` default relative path  is  `dist`、`types name` default type file name is `index.d.ts`
+ `emp tsc` generate `index.d.ts` to `dist` directory 
  + `emp build --ts -p [types path] -n [types name]` `types path` default relative path  is `dist`、`types name` default type file name is  `index.d.ts`

+ `emp tss <remote-url>` Synchronization remote type
    + `emp tss <remote-url> -p [types path] -n [types name]` `types path` default relative path  is `src`、`types name` default type file name is `empType.d.ts`
+ `emp serve` Formal service
+ `emp` help 
+ `emp dist:ts` Synchronize local declaration files to subprojects
  + `emp tsc && emp dist:ts && emp dev`
  + dist:ts：default reads the local package.json childPath field to loop output, try to keep base project and project project in the same level, package.json：
  + ```javascript
    {
      "childPath": [
        {
          "path": "project",
          "name": "xxx.d.ts"
        },
        {
          "path": "/User/project",
          "name": "xxx.d.ts"
        }
      ]
    }
    ```

## 🧞‍♂️ Command plugin development guide

+ command - define the name of the command line command
+ description - description, it will be shown in help
+ option - Define parameters. It accepts four parameters. In the first parameter, it can enter the short name -a and the long name -app, separated by | or,. When used on the command line, these two are equivalent. The difference is The latter can be obtained through callbacks in the program; the second is the description, which will be displayed in the help message; the third parameter is the callback function, and the parameter it receives is a string. Sometimes we need a command line to create multiple Module, you need a callback to process; the fourth parameter is the default value
+ action - Register a callback function, here you need to pay attention to the current callback does not support let declaration variables

### plugin, the package name prefix needs to be `emp-plugin-*`, `index.js` is the emp global plugin entry.

[Command Plugin Template Project](https://github.com/efoxTeam/emp/tree/main/projects/emp-plugin-example)

> During development, start `yarn emp in the current project directory. Your command name-option name` can be started directly

+ Create a new project with `emp-plugin-` as the project prefix, and the plugin entry is `index.js`
```javascript
registerCommand({
  command: 'helloGlobalPlugin',
  description: 'It is description',
  options: [{name: '-i, --item <item>', description: 'flavour of pizza'}],
  action: ({item}) => {
    console.log(`global ${item}`)
  },
})
```

 + After the development is completed (emp-plugin-example is only the example package name, the specific package name is subject to the actual package name):
  + Install via `yarn`:
    + `yarn global add emp-plugin-example`
  + Install via `npm`:
    + `npm install emp-plugin-example -g`

 Start emp under the command to use the plugin<br>
 <img src='https://user-images.githubusercontent.com/19996552/113428029-a55e4500-9408-11eb-906d-29795199f422.png' width='600' alt="npx @efox/emp-cli init"/>
<br>

## ✍🏻 Environment variable 
+ MODE_ENV webpack mode Environment variable , use  `process.env.EMP_ENV` 
+ EMP_ENV use `emp dev --env prod` Set up to distinguish the deployment environment , use `process.env.EMP_ENV`

## 👨🏻‍🏭 Plugin
+ [Generate type files for Module Federation project](https://www.npmjs.com/package/@efox/emp-tune-dts-plugin)

## 👩🏻‍💻 VSCODE SETTINGS
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // eslint Auto format
  },
  "typescript.tsdk": "node_modules/typescript/lib", // ts css module type check
  "typescript.enablePromptUseWorkspaceTsdk": true   // ts css module type check
}

```
