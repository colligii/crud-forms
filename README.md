
## API Reference

### Forms

#### Get All Contacts

```http
  GET /forms/all
```

- Body:

No Body.

- Query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` | **Required**. Number of page starts in 0. |

- Header:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |




--------



#### Get a unique Contacts

```http
  GET /forms/:id
```

- Body:

No Body.

- Header:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params: 


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. id of contact. |



--------



#### Delete a contact

```http
  DELETE /forms/:id
```

- Body:

No Body.

- Header:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params: 


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. id of contact. |





--------



#### Update a unique Contacts

```http
  PUT /forms/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. id of contact. |
| `name` | `string` | **Optional**. Name of contact. |
| `phone` | `string` | **Optional**. Phone of contact. |
| `message` | `string` | **Optional**. Phone of contact. |


- Header:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

--------

#### Create a unique Contacts

```http
  POST /forms/
```


- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of contact. |
| `phone` | `string` | **Required**. Phone of contact. |
| `message` | `string` | **Required**. Phone of contact. |


- Header:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


### Login

#### Create a unique Contacts

```http
  POST /login/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Name of contact. |
| `password` | `string` | **Required**. Phone of contact. |


### Login

#### Create a unique Contacts

```http
  POST /login/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Name of contact. |
| `password` | `string` | **Required**. Phone of contact. |


### Permission

#### Create a unique Permission 

```http
  POST /permission/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of Permission. |
| `description` | `string` | **Required**. description of permissions. |

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Create a unique Permission

```http
  PUT /permission/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of Permission. |
| `name` | `string` | **Optional**. name of permissions. |
| `description` | `string` | **Optional**. description of permissions. |

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Delete a unique Permission

```http
  DELETE /permission/:id
```

- Body:
No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of permission |


#### Get all Permission

```http
  GET /permission/all
```

- Body:
No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


#### Get a unique Permission 

```http
  GET /permission/:id
```

- Body:

No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of permission |



### Role

#### Create a unique role 

```http
  POST /roles/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of Roles. |
| `description` | `string` | **Required**. description of roles. |

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Create a unique roles

```http
  PUT /roles/
```

- Body:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of roles. |
| `name` | `string` | **Optional**. name of roles. |
| `description` | `string` | **Optional**. description of roles. |

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Delete a unique roles

```http
  DELETE /roles/:id
```

- Body:
No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of roles |


#### Get all roles

```http
  GET /roles/all
```

- Body:
No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


#### Get a unique Permission 

```http
  GET /roles/:id
```

- Body:

No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of roles |


### Permission On Role

Connect a permission on role

#### Connect a role

```http
  POST /permission-on-role/connect
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `role_id` | `uuid` | **Required**. ID of role |
| `permissions_id` | `array<uuid>` | **Required**. Array of uuid |


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


#### Disconnect a role

```http
  POST /permission-on-role/disconnect
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `role_id` | `uuid` | **Required**. ID of role |
| `permissions_id` | `array<uuid>` | **Required**. Array of uuid |


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


### User


#### Get all users

```http
  POST /user/all
```

- Body:

No Body


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |


#### Update a user

```http
  PUT /user
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of user |
| `email` | `email` | **Required**. email of user |


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Delete a unique user

```http
  DELETE /user/:id
```

- Body:
No Body

- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

- Params:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of user |


#### Create a user

```http
  POST /user
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `email` | **Required**. email of user |
| `password` | `string` | **Required**. password of user |
| `role_id` | `uuid` | **Required**. ID of Role |


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |



#### Send again the code user

```http
  POST /user/again-code
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. ID of User |


- Headers:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Your Token key |

#### Active the code user

```http
  POST /user/active
```

- Body:


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `emaiç` | **Required**. email of User |
| `password` | `string` | **Required**. password of User |
| `activation_code` | `string` | **Required**. activation code of User |
