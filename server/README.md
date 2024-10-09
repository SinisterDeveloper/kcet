# Installation

Once you have cloned the repository and navigated to the project in the terminal, navigate to the server folder

```bash
cd server
```

## Dependencies

Install the project dependencies by running the following command

```bash
npm install
```

## Configuring Environment Variables

Rename the `.env.example` file into `.env` and open the file.

### MongoDB Connection URI

Fill the `MONGO_URI` field with your MongoDB Cluster's Connection Uri. If you do not know how to fetch the uri string, please read **[here](https://docs.mongodb.com/guides/cloud/connectionstring/)**
(enter the URI within the double-quotes)

### Web Domain

The domain on which the client part of the application is running. For example: `http://localhost:3000` or `https://kcet.org`

### Server Domain

The domain on which the current server part of the application will run. For example: `http://localhost:5000` or `https://api.kcet.org`

### Server Secret

Confidential "Token" to be used for authentication of requests. This value must match what you used in the client part of the project

### Port

`PORT` is preset to `5000`, however, if another instance is already running on that port, you can change it to something else (ex 7000)

## Building and Running the Application

```bash
npm run build

npm start
```

The following two commands will build and start the application!