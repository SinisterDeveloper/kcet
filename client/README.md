# Installation

Once you have cloned the repository and navigated to the project in the terminal, navigate to the client folder

```bash
cd client
```

## Dependencies

Install the project dependencies by running the following command

```bash
npm install
```

## Configuring Environment Variables

Create a file called `.env.local` and paste the following into the file

```
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'

# Fill in the below values

AUTH0_ISSUER_BASE_URL=''
AUTH0_CLIENT_ID=''
AUTH0_CLIENT_SECRET=''

AUTH0_BASE_URL=''

API_SERVER=''
SERVER_SECRET=''
```

### AUTH0

You need to have an `AUTH0` account as it is the login and session provider for the application

- `AUTH0_ISSUER_BASE_URL` - The AUTH0 URL assigned to your account for login. For example: `https://user.jp.auth0.com`
- `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` - The Client ID and Secret for your AUTH0 application
- `AUTH0_BASE_URL` - The domain on which the website will be hosted. For example: `https://kcet.org` or `http://localhost:3000`

### Server Credentials

- `API_SERVER` - The domain on which the API server will be hosted. For example: `https://api.kcet.org` or `http://localhost:5000`
- `SERVER_SECRET` - Confidential "Token" to be used for authentication of requests. This value must match what you used or will use in the server part of the project

## Building and Running the Application

```bash
npm run build

npm start
```

The following two commands will build and start the application!