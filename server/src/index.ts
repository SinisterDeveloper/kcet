import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
const fsProm = fs.promises;
// @ts-ignore
import compression from 'compression';
const App = express();
require('dotenv').config();
import { Categorise, Authenticate } from './modules/util';
import mongoose from 'mongoose';
import Result from './models/Result';
import Client from './models/Client';
import { Clients, ClientData } from './modules/cache';

const adminRoutes = fs
	.readdirSync('./routes/admin')
	.filter((file: string) => file.endsWith('.js'));

const clientRoutes = fs
	.readdirSync('./routes/client')
	.filter((file: string) => file.endsWith('.js'));

dotenv.config({ path: '../.env.example' });
App.use(express.json());
App.use(compression());
App.use(Authenticate);
App.disable('x-powered-by');

// -----------------CONNECTION-----------------------------------------------------

async function connect() {
	if (!process.env.MONGO_URI || !process.env.PORT) {
		console.error('MongoDB connection required to run the application!');
		process.exit(1);
	}
	console.log(
		'------------------ KCET ALLOTMENT ANALYZER - SERVER ------------------------------------------------',
	);
	mongoose
		.connect(process.env.MONGO_URI, {
			dbName: 'kcet',
		})
		.then(() => {
			console.log('Established Connection with Database');
		})
		.catch((error) => console.log(error));

	await fetchResults();
	await fetchClients();
	await handleRoutes();

	App.listen(parseInt(process.env.PORT), '0.0.0.0', () => {
		fetch(`${process.env.WEB_DOMAIN}/api/auth/admin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				admin: process.env['SERVER_SECRET'],
			}),
		}).then((req: any) => {
			if (req.status === 200)
				console.log('Client and Server Secrets matched!');
			else
				console.log(
					'Critical Error: Client and Server Tokens did not match!',
				);
		});
		console.log(`API running at ${process.env.SERVER_DOMAIN}/`);
	});
}

// ------------------CLIENTS/RESULTS-------------------------------------------------

async function fetchResults() {
	try {
		const results = await Result.find().lean();
		console.log('Results successfully fetched from Database');
		Categorise(results);
		console.log('Data successfully categorised');
	} catch (error) {
		console.error(error);
	}
}

async function fetchClients() {
	try {
		const ClientUsers: ClientData[] = await Client.find().lean();
		for (const data of ClientUsers) Clients.set(data.id, data);

		console.log('Clients successfully fetched from Database');
	} catch (error) {
		console.error(error);
	}
}

// ------------- ROUTES-HANDLER---------------------------------------------------------------

const routePaths = {
	adminRoutes: 'admin',
	clientRoutes: 'client',
};

const routeRegistry = new Map();

async function loadEndpoint(routePath: string, fileName: string) {
	const endpointPath = path.join(__dirname, 'routes', routePath, fileName);
	return require(endpointPath);
}

async function registerRoute(
	App: Application,
	basePath: string,
	methods: string[],
) {
	const [fileName] = basePath.split('/').slice(-1);
	const endpoint = await loadEndpoint(
		basePath.split('/').slice(1, -1).join('/'),
		`${fileName}.js`,
	);

	methods.forEach((method) => {
		if (endpoint[method]) {
			// @ts-ignore
			App[method](basePath, async (req: Request, res: Response) => {
				try {
					await endpoint[method](req, res);
				} catch (error) {
					console.error(`Error handling route: ${error}`);
					res.sendStatus(500);
				}
			});
			routeRegistry.set(
				`${basePath}_${method.toLowerCase()}`,
				endpoint[method],
			);
		}
	});
}

async function handleRequest(req: Request, res: Response) {
	const { method, originalUrl } = req;
	const handler = routeRegistry.get(`${originalUrl}_${method.toLowerCase()}`);

	if (handler) {
		try {
			await handler(req, res);
		} catch (error) {
			console.error(`Error handling route: ${error}`);
			res.sendStatus(500);
		}
	} else {
		console.log(
			`Request sent from IP: ${req.ip} for invalid method  ${method}: ${originalUrl}`,
		);
		res.sendStatus(404);
	}
}

async function handleRoutes() {
	const methods = ['get', 'post'];
	const routeDirs = [adminRoutes, clientRoutes];

	for (const dir of routeDirs) {
		const routePath =
			routePaths[dir === adminRoutes ? 'adminRoutes' : 'clientRoutes'];
		const fileNames = await fsProm.readdir(
			path.join(__dirname, 'routes', routePath),
		);

		for (const fileName of fileNames) {
			if (fileName.endsWith('.js')) {
				const basePath = `/${routePath}/${path.basename(fileName, '.js')}`;
				await registerRoute(App, basePath, methods);
			}
		}
	}
	App.use(handleRequest);
	console.log('Registered all Routes');
}

// ---------------------------------------------------------------------------------------------

connect().catch((e) => console.log(e));

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection: ', error);
});
