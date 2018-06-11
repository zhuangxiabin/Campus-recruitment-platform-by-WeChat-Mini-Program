## 代码简介

```tree
Demo
├── LICENSE
├── README.md
├── app.js
├── app.json
├── bower.json
├── config.js
├── package.json
├── pages
│   └── index
│       ├── index.js
│       ├── index.wxml
│       └── index.wxss
└── vendor
    └── qcloud-weapp-client-sdk/
```

`app.js` 是小程序入口文件。

`app.json` 是小程序的微信配置，其中指定了本示例的两个页面，页面分别在 `pages/index/` 和 `pages/chat/` 目录下。

`config.js` 是我们小程序自己的业务配置。

`wafer2-client-sdk` 是[客户端 SDK](https://github.com/tencentyun/wafer2-client-sdk)
