<!-- @format -->

# Aplication Uploader

A website that helps to upload small size images quickly.

## Demo

https://upload-applicationz.surge.sh

## Run Locally

Clone the project

```bash
  git clone https://github.com/boybubbles/drag-n-drop.git
```

Go to the project directory

```bash
  cd drag-n-drop
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

#### Get all items

```http
  GET https://back-end-nodejs1.herokuapp.com/api/getFiles
```

#### Upload item

```http
  POST https://back-end-nodejs1.herokuapp.com/api/upload
```

#### Delete item

```http
  DELETE https://back-end-nodejs1.herokuapp.com/api/deleteFiles/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Tech Stack

**Client:** React, Redux, React-bootstrap, Axios

**Server:** Node, Express

https://github.com/boybubbles/NodeJS-Sever.git

## Authors

- [@phanminhduy](https://github.com/boybubbles)
