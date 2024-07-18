---
title: fastify-message-center v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="fastify-message-center">fastify-message-center v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

消息中心

<h1 id="fastify-message-center-default">Default</h1>

## get__api_v1_sendEmail

`GET /api/v1/sendEmail`

*发送邮件*

发送邮件

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "description": "信息"
    }
  }
}
```

<h3 id="get__api_v1_sendemail-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回值说明|Inline|

<h3 id="get__api_v1_sendemail-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|信息|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_sendMessage

`GET /api/v1/sendMessage`

*发送信息*

发送信息

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "description": "信息"
    }
  }
}
```

<h3 id="get__api_v1_sendmessage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回值说明|Inline|

<h3 id="get__api_v1_sendmessage-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|信息|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

