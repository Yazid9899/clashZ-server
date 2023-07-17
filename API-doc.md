# Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `GET /accounts`
- `POST /accounts/add`
- `POST /midTrans-Token`
- `PATCH /buyFeature`
- `GET /troops`
- `GET /traintoops/:accId`
- `POST /traintoops/:troopId/:accId`
- `POST /logInGoogle`

##  POST /register
- create an account as users and added to database

### Request:

#### body:
```json
{
  "email": "string",
  "password": "string",
}
```

### Response:
_201 - Created_
```json
{
  "statusCode": 201,
  "message": "registered",
  "data": {
    "id": "integer",
    "email": "string",
    "features": "string"
  }
}
```
_400 - Bad Request_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"

}
```
##  POST /login
- get access_token for customer to acces some endpoint

### Request:
#### body:
```json
{
  "email": "string",
  "password": "string"
}
```
### Response:
_201 - logIn_
```json
{
  "access_token": "string",
  "email": "string",
  "role": "string"
}
```
_401 - Bad Request_
```json
{
  "statusCode": 401,
  "message": "invalid email or password"
}
```
## GET /accounts

#### Description
- Get all Acount with users Id from database

### Request:
#### headers: 
```json
{
  "access_token": "string"
}
```
### Response:
_200 - OK_
```json
{
    "statusCode": 200,
    "account": [
        {
        "playerTag": "string",
        "maxSpace": "integer",
        "maxSpell": "integer",
        "userId": "integer",
        "name": "string",
        "townHallLevel": "integer",
        "trophies": "integer",
        }
        .....
    ]
}
```
## POST /accounts/add
#### Description
- Create/add Acount with coc tag and apikey from game
### Request:
#### headers: 
```json
{
  "access_token": "string"
}
```

#### body:
```json
{
  "playerTag": "string",
  "token": "string",
}
```
### Response:
_200 - OK_
```json
{
    "statusCode": 200,
    "account": [
        {
        "playerTag": "string",
        "maxSpace": "integer",
        "maxSpell": "integer",
        "userId": "integer",
        "name": "string",
        "townHallLevel": "integer",
        "trophies": "integer",
        }
        .....
    ]
}
```

## POST /midTrans-Token
### Description
- get midtrans token for transaction
### Request:
#### headers: 
```json
{
  "access_token": "string"
}
```

### Response:
_201 - Created_
```json
{
    "token": "string",
}
```

## PATCH /buyFeature
#### Description
- update user status for buy feature  and save it to database

### Request:
#### headers:
```json
{
  "access_token": "string"
}
```
#### Response
_200 - OK_
```json
{
    "message": "features have been purchased",
}
```


## GET /troops
#### Description
- Get all troop from database


### Response:
_200 - OK_
```json
{
    "troop": [
        {
        "name": "string",
        "type": "string",
        "space": "integer",
        "imageUrl": "string",
        "UserId": "integer",
        },
        {
        "name": "string",
        "type": "string",
        "space": "integer",
        "imageUrl": "string",
        "UserId": "integer",
        },
        {
        "name": "string",
        "type": "string",
        "space": "integer",
        "imageUrl": "string",
        "UserId": "integer",
        }
        .....
    ]
}
```


## GET /traintoops/:accId
## GET /categories
#### Description
- Get all trained troops with same accountId from data

### Request:
#### headers:
```json
{
  "access_token": "string"
}
```
#### params:
```json
{
  "accId": "integer"
}
```
### Response:
_201 - Ok_
```json
{
    "data": [
        {
            "id": "integer",
            "AccountId": "integer",
            "TroopId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "Troop": {
                "id": "integer",
                "name": "string",
                "type": "string",
                "space": "integer",
                "imageUrl": "string",
                "UserId": "integer",
                "createdAt": "date",
                "updatedAt": "date"
            }
        },
        {
            "id": 2,
            "AccountId": "integer",
            "TroopId": 2,
            "createdAt": "string",
            "updatedAt": "string",
            "Troop": {
                "id": 2,
                "name": "Archer",
                "type": "range",
                "space": "integer",
                "imageUrl": "https://w7.pngwing.com/pngs/742/645/png-transparent-clash-of-clans-archer-illustration-clash-of-clans-clash-royale-game-clash-of-clans-video-game-fictional-character-desktop-wallpaper-thumbnail.png",
                "UserId": "integer",
                "createdAt": "string",
                "updatedAt": "string"
            }
        }
    ]
}
```
