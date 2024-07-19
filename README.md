
# fastify-message-center


### 描述

消息中心


### 安装

```shell
npm i --save @kne/fastify-message-center
```

### 示例

#### 示例代码



### API

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

<h1 id="fastify-message-center--">消息</h1>

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
    "data": {
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
|» data|string|false|none|信息|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_message_send

`GET /api/v1/message/send`

*发送信息*

发送信息

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "string",
      "description": "信息"
    }
  }
}
```

<h3 id="get__api_v1_message_send-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回值说明|Inline|

<h3 id="get__api_v1_message_send-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|string|false|none|信息|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_message_resend

`GET /api/v1/message/resend`

*重新发送信息*

重新发送信息

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "string",
      "description": "信息"
    }
  }
}
```

<h3 id="get__api_v1_message_resend-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回值说明|Inline|

<h3 id="get__api_v1_message_resend-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|string|false|none|信息|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_message_get

`GET /api/v1/message/get`

*获取单条消息*

获取单条消息

<h3 id="get__api_v1_message_get-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|none|

<h3 id="get__api_v1_message_get-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_message_list

`GET /api/v1/message/list`

*获取消息列表*

获取消息列表

<h3 id="get__api_v1_message_list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="fastify-message-center--">消息记录</h1>

## get__api_v1_record_get

`GET /api/v1/record/get`

*获取单条消息记录*

获取单条消息记录

<h3 id="get__api_v1_record_get-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|none|

<h3 id="get__api_v1_record_get-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_record_list

`GET /api/v1/record/list`

*获取消息记录列表*

<h3 id="get__api_v1_record_list-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|object|false|none|
|currentPage|query|number|false|none|
|perPage|query|number|false|none|

<h3 id="get__api_v1_record_list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="fastify-message-center--">模板</h1>

## post__api_v1_template_add

`POST /api/v1/template/add`

*添加模板*

添加模板

> Body parameter

```json
{
  "type": "object",
  "required": [
    "name",
    "type",
    "template"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "template": {
      "type": "string"
    }
  }
}
```

<h3 id="post__api_v1_template_add-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» type|body|string|true|none|
|» template|body|string|true|none|

<h3 id="post__api_v1_template_add-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_template_get

`GET /api/v1/template/get`

*获取单条模板*

获取单条模板

<h3 id="get__api_v1_template_get-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|none|

<h3 id="get__api_v1_template_get-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

## get__api_v1_template_update

`GET /api/v1/template/update`

*修改模板*

修改模板

<h3 id="get__api_v1_template_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|string|true|none|
|name|query|string|true|none|
|type|query|string|true|none|
|template|query|string|true|none|

<h3 id="get__api_v1_template_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Default Response|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas


