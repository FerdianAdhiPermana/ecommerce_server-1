# ecommerce_server
    Merupakan aplikasi untuk sistem manajemen konten e-commerce

**Fitur Apps**
* Login Admin
* Login User
* Register User
* Membuat Product
* Membuat Cart


**Running Apps**

```json
npm install
npx sequelize db:migrate all --env=test
npm run dev
```

# Login


**URL** : `{{base_url}}/users/login`

**Method** : `POST`

**Auth required** : NO

**Data example**

```json
{
    "username": "admin@shop.com",
    "password": "1234578",
    "role": "admin"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZmVyZGlhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxMTI4MTh9.DKY3uz5S8BLFSoD_JZOkoN6-uTGtXEXkzhZXP9ZxZRQ"
}
```

## Error Response


**Condition** : If 'password' is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
  "status": false,
  "message": "invalid password"
}
```

## Error Response

**Condition** : If 'email' is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "status":false,
    "message":"invalid email"
}
```
## Error Response

**Condition** : If not 'admin'.

**Code** : `403 Forbidden`
*Content** :

```json
{
    "status":false,
    "message":"admin only"
}
```

# Register


**URL** : `{{base_url}}/users/register`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "adhi@gmail.com",
    "password": "12345"
}
```

## Success Response

**Code** : `201 OK`

**Content example**

```json
{
    "status": true,
    "message": "success register account",
    "data": {
        "id": 13,
        "email": "ferdian@gmail.com",
        "password": "$2a$10$imo5f/C26RAwLkbgQc5zouTHsHYU5vD0ay6biv3HQV4uR409KT76y",
        "createdAt": "2020-11-19T02:49:54.317Z",
        "updatedAt": "2020-11-19T02:49:54.318Z"
    }
}
```

## Error Response

**Condition** : If 'email' already registered.

**Code** : `409 Conflict`

**Content** :

```json
{
    "status": false,
    "message": "email already exists"
}
```

# Add Product


**URL** : `{{base_url}}/products`

**Method** : `POST`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"name":"PULLOVER SWEAT Basquiat x WB HOODIE (PJG)",
	"image_url":"https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE",
	"price":399000,
	"stock":10,
}

```

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
  "status": true,
  "message": "success save product",
  "data": {
    "id": 12,
    "name":"PULLOVER SWEAT Basquiat x WB HOODIE (PJG)",
	"image_url":"https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE",
	"price":399000,
	"stock":10,
  "creator_id": 14,
  "createdAt": "2020-11-19T02:49:54.317Z",
  "updatedAt": "2020-11-19T02:49:54.318Z"
  }

```

## Error Response

**Condition** : If 'validate' required.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "Name is required",
    "Image_url is required",
    "Price is required",
    "Stock is required",
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Get Product


**URL** : `{{base_url}}/products/{{products_id}}`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}

```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get product",
  "data": [
    {
      "id": 12,
      "name":"PULLOVER SWEAT Basquiat x WB HOODIE (PJG)",
	    "image_url":"https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE",
	    "price":399000,
	    "stock":10,
      "creator_id": 14,
      "createdAt": "2020-10-31T03:29:25.496Z",
      "updatedAt": "2020-10-31T03:29:25.497Z"
    }
  ]
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Update product


**URL** : `{{base_url}}/products/{{product_id}}`

**Method** : `PUT`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
	"name":"PULLOVER SWEAT Basquiat x WB HOODIE (PJG)",
	"image_url":"https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE",
	"price":399000,
	"stock":10,
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success update product",
  "data": {
    "id": 13,
    "name":"PULLOVER SWEAT Basquiat x WB HOODIE (PJG)",
	  "image_url":"https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE",
	  "price":399000,
	  "stock":10,
    "creator_id": 12,
    "createdAt": "2020-10-31T03:52:35.042Z",
    "updatedAt": "2020-10-31T04:03:36.551Z"
  }
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete product


**URL** : `{{base_url}}/products/{{product_id}}`

**Method** : `DELETE`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success delete product",
  "data": []
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```
# Get List Cart


**URL** : `{{base_url}}/carts`

**Method** : `GET`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success get cart",
  "data": [
    {
      "id": 1,
      "quantity": 1,
      "productId": 1,
      "userId": 1,
      "createdAt": "2020-10-31T02:34:04.032Z",
      "updatedAt": "2020-10-31T02:34:04.034Z",
}
```

## Error Response

**Condition** : If 'required' field.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "cart quantity is required",
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

# Add Cart


**URL** : `{{base_url}}/carts`

**Method** : `POST`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
  "quantity":1,
  "productId":1,
  "userId":1,
  
}

```

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
  "status": true,
  "message": "success save cart",
  "data": {
     "id": 1,
     "quantity": 1,
     "productId": 1,
     "userId": 1,
     "createdAt": "2020-10-31T02:34:04.032Z",
     "updatedAt": "2020-10-31T02:34:04.034Z",

```

## Error Response

**Condition** : If 'validate' required.

**Code** : `400 Bad Request`

**Content** :

```json
{
  "status": false,
  "message": [
    "quantity is required",
  ]
}
```

## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```

# Update product


**URL** : `{{base_url}}/carts/{{cart_id}}`

**Method** : `PATCH`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
  "quantity": 1,
  "productId": 1,
  "userId": 1,
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success update product",
  "data": {
     "id": 1,
     "quantity": 1,
     "productId": 1,
     "userId": 1,
     "createdAt": "2020-10-31T02:34:04.032Z",
     "updatedAt": "2020-10-31T02:34:04.034Z","
  }
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```


# Delete product


**URL** : `{{base_url}}/carts/{{cart_id}}`

**Method** : `DELETE`

**Auth required** : true


**Header**
```json
{
	Content-Type: application/json,
	token: {{token}}
}
```

**Data example**

```json
{
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": true,
  "message": "success delete product",
  "data": []
}
```


## Error Response

**Condition** : If 'token' header invalid.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status":false,
    "message":"invalid token"
}
```

## Error Response

**Condition** : If 'token' not authorized.

**Code** : `500 Internal server error`

**Content** :

```json
{
    "status": false,
    "message": "not authorized"
}
```