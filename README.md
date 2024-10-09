# KCET Allotment Analyzer

### What is KCET

KCET is one of the biggest engineering entrance exams conducted in India for the purpose of admission of students to the first year or first semester of full-time courses in medical, dental and engineering courses in professional Universities

### What is KCET Allotment/Counselling and what does the Scraper do

KCET Counselling/Allotment is very similar to The National Resident Matching Program (NRMP) of the USA, the only major difference being the field of study. The scraper scrapes information off of the allotment result page and displays it in an organized manner helpful as an analyzing tool

## 🚀 Features

- **MongoDB** for database management.
- **Express** as the backend framework.
- **Next.js** with **React** for the frontend.
- Server-Side Rendering (SSR) and Static Site Generation (SSG) with **Next.js**.
- **REST API** for seamless communication between frontend and backend.

## Scraper

The Scraper utilizes the native Fetch API to retrieve data from the results website. It parses the retrieved information
and stores it in the MongoDB database for subsequent usage by the Server. It is recommended to run this process prior to
the deployment of the server or the client application. By default, the Scraper examines all potential 675,000
combinations of roll numbers; however, this exhaustive check can be bypassed for subsequent rounds if already completed.

*Note:* Large-scale data scraping, particularly when performed at a rapid pace, demands substantial resources from both
the client and server side. In certain instances, it may be deemed illegal or considered a "Denial of Service" attack.
The responsibility of ensuring legal and ethical use of this code lies with the end-user. Please refer to the LICENSE
for further important notices.

## Server

The server is built using **Express** and is responsible for handling all backend operations. It fetches information
from the **MongoDB** database and responds to request calls made by the client. The server ensures efficient data
retrieval and management, providing the necessary endpoints for the frontend to interact with. This enables seamless
communication between the client and the database, facilitating features such as user queries and
result analysis using REST API

## Client

The Client leverages the robust capabilities of Next.js and React to facilitate a seamless and interactive user
experience. By utilizing Next.js's Server-Side Rendering (SSR) and Static Site Generation (SSG), the client application
ensures optimal performance and quicker load times. When an end user performs a search query, the Client dynamically
makes API calls to the server using RESTful endpoints established in the Express backend. These API calls securely fetch
the required information from the MongoDB database, enabling real-time data retrieval and display on the client
interface. This approach ensures efficient communication between the client and server, delivering accurate and timely
results to the user.

# Installation

To set up and run the KCET Allotment Analyzer application locally, follow these detailed steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14.x or above)
- npm (Node Package Manager)
- MongoDB (either local instance or cloud-based like MongoDB Atlas)

### Download the Repository

Clone the GitHub repository to your local machine:

```bash
git clone https://github.com/SinisterDeveloper/kcet
cd kcet
```

### Running the Applications

This code repository consists of 3 sub-applications or programs that need to be run in a specific order and the instructions for running the program are given below:

#### 1 - [Scraper](https://github.com/SinisterDeveloper/kcet/tree/stable/scraper/README.md)
#### 2 - [Client](https://github.com/SinisterDeveloper/kcet/tree/stable/client/README.md)
#### 3 - [Server](https://github.com/SinisterDeveloper/kcet/tree/stable/server/README.md)

## License

