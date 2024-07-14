# Veigo Chat

**Veigo Chat** is a scalable and reliable chat platform designed for seamless real-time communication. It showcases a modern microservices architecture and leverages technologies such as GraphQL, WebSockets, gRPC, Kafka, and Debezium.

## Table of Contents

-   [Architecture](#architecture)
    -   [Architecture Overview](#architecture-overview)
    -   [Components](#components)
    -   [Data Flow](#data-flow)
    -   [Entity-Relationship Diagrams (ERD)](#entity-relationship-diagrams-erd)
-   [Features](#features)
    -   [Real-time Messaging](#real-time-messaging)
    -   [GraphQL and WebSockets](#graphql-and-websockets)
    -   [gRPC Integration](#grpc-integration)
    -   [Debezium CDC](#debezium-cdc)
    -   [Kafka Message Broker](#kafka-message-broker)
    -   [Open Policy Agent (OPA)](#open-policy-agent-opa)
    -   [Data Aggregation and Storage](#data-aggregation-and-storage)
    -   [Authentication and Authorization](#authentication-and-authorization)
    -   [Scalability and Resilience](#scalability-and-resilience)
-   [Installation](#installation)
-   [Usage](#usage)

## Architecture

### Architecture Overview

![Architecture Diagram Zoom Out](misc/diagrams/Architecture/Architecture%20Zoom%20Out.png?raw=true)

### Components

1. **Client:**
    - Interacts with the Gateway using GraphQL and WebSocket protocols for all communication.
2. **Gateway:**
    - Acts as the primary access point for clients.
    - Manages GraphQL and WebSocket connections and directs requests to relevant backend services via gRPC.
3. **Authentication Service:**
    - Manages user authentication.
    - Interacts with PostgreSQL for storing and retrieving user credentials.
    - Communicates with the Gateway using gRPC.
4. **Chat Service:**
    - Manages chat functionalities.
    - Maintains chat data in PostgreSQL.
    - Communicates with the Gateway using gRPC.
5. **Real-Time Service:**
    - Handles real-time messaging functionalities.
    - Utilizes WebSocket for live data transfer.
    - Interacts with Kafka to manage user messages.
6. **Debezium:**
    - A Change Data Capture (CDC) platform.
    - Monitors and captures incremental database changes, transforming them into event streams.
    - Channels these events into Kafka for processing.
7. **Kafka:**
    - Serves as the message broker.
    - Works with Debezium to capture and distribute data changes.
8. **Aggregator Service:**
    - Aggregates data from multiple services.
    - Stores aggregated data in MongoDB.
9. **Open Policy Agent (OPA):**
    - General-purpose policy engine that enables policy-as-code.
    - Unifies policy enforcement across the stack.
10. **PostgreSQL:**

    - Relational database used by Authentication and Chat services for data storage.

11. **MongoDB:**
    - NoSQL database used by the Aggregator service for storing aggregated data.

### Data Flow

-   The client initiates interactions via the Gateway using GraphQL and WebSocket.
-   Requests are routed by the Gateway to appropriate services like Authentication and Chat through.
-   Debezium captures changes in PostgreSQL and feeds them to Kafka.
-   Kafka acts as a central message broker, distributing events between services.
-   The Real-Time service manages live messaging via WebSocket.
-   The Aggregator service collects data from Kafka, processes it, and stores it in MongoDB.
-   OPA takes reliable decisions based on the stored policies & the aggregated data.

For a detailed view of the OPA integration, please refer to the [OPA Zoom In](misc/diagrams/Architecture/OPA%20Zoom%20In.png) diagram.

### Entity-Relationship Diagrams (ERD)

-   [Authentication ERD](misc/diagrams/ERD/Authentication%20Service.png)
-   [Authorization ERD](<misc/diagrams/ERD/Aggregator%20(Authorization)%20Service.png>)
-   [Chat Service ERD](misc/diagrams/ERD/Chat%20Service.png)

## Features

**Veigo Chat** offers a comprehensive set of features designed for robust and efficient real-time communication, supported by a scalable and resilient architecture. The key features include:

### Real-time Messaging

-   **Instantaneous Communication:** Facilitates instantaneous exchange of text messages between users, ensuring a seamless chat experience.
-   **WebSocket Protocol:** Utilizes WebSocket for real-time data transmission, providing low-latency communication between clients and the Real-Time Service.

### GraphQL and WebSockets

-   **GraphQL API:** Provides a flexible and efficient query language for client-server interactions, enabling clients to request exactly the data they need.
-   **WebSockets for Subscriptions:** Leverages WebSocket connections for real-time updates and notifications, enhancing the interactivity of the chat platform.

### gRPC Integration

-   **High-speed Inter-service Communication:** Employs gRPC for efficient communication between the Gateway and backend services (Authentication, Chat), ensuring low-latency and high-throughput data exchanges.

### Debezium CDC

-   **Change Data Capture:** Debezium captures row-level changes in PostgreSQL databases and converts them into event streams, enabling real-time data synchronization across services.
-   **Integration with Kafka:** Feeds captured data changes into Kafka, which acts as a central message broker for distributing events to other services.

### Kafka Message Broker

-   **Event-driven Architecture:** Kafka facilitates the distribution of messages between services, supporting an event-driven architecture that ensures decoupling and scalability.
-   **High-throughput Messaging:** Capable of handling high-throughput messaging, making it suitable for real-time applications.

### Open Policy Agent (OPA)

-   **Policy-as-code:** Implements policy-as-code, allowing for flexible and centralized policy management and decision making.
-   **Unified Policy Enforcement:** Ensures consistent policy enforcement across the stack.

### Data Aggregation and Storage

-   **Aggregator Service:** Collects and processes data from multiple services, providing a unified view of the data.
-   **MongoDB for Aggregated Data:** Uses MongoDB to store aggregated data, ensuring efficient data retrieval and analysis.

### Authentication and Authorization

-   **User Authentication:** The Authentication Service manages user credentials and authentication, interacting with PostgreSQL for secure data storage.
-   **Policy Enforcement:** OPA ensures that all access and actions are compliant with defined policies, enhancing the security of the platform.

### Scalability and Resilience

-   **Microservices Architecture:** The system is designed using a microservices architecture, allowing for independent scaling and development of individual services.
-   **Distributed System:** Leveraging Kafka and gRPC ensures that the system can handle a large number of concurrent connections and messages, providing high availability and fault tolerance.

These features collectively make **Veigo Chat** a powerful and flexible platform for real-time communication, capable of scaling to meet the demands of modern chat applications.

## Installation

1. **Install Docker Desktop:**
   Simplify the management and deployment of containerized applications by downloading and installing Docker Desktop from [here](https://www.docker.com/products/docker-desktop).

2. **Clone the Repository:**
   Clone the repository to your local machine using the following command:

    ```bash
    git clone git@github.com:Kirlos-Melad/Veigo-Chat.git
    ```

3. **Navigate to Backend Directory:**
   Navigate to the backend directory of the project:

    ```bash
    cd Veigo-Chat/backend
    ```

4. **Run Docker Compose:**
   Start the application using Docker Compose with the following command:

    ```bash
    docker-compose --env-file docker-compose.env up -d
    ```

## Usage

1. **Access GraphQL Playground:**
   Open your web browser and go to `localhost:4000/playground`. Take the time to explore the comprehensive schema provided within the playground.

2. **Example GraphQL Query:**
   To authenticate using GraphQL mutations and create a profile:

    ```graphql
    mutation {
    	SignUpAndCreateProfile(
    		name: "Bob"
    		email: "bob@veigo.com"
    		password: "Password@123"
    		clientId: "123abc"
    	) {
    		account {
    			id
    		}

    		profile {
    			name
    		}

    		token {
    			access
    			refresh
    		}
    	}
    }
    ```

    For further examples, see [GraphQL Examples](misc/gql/queries.gql).

3. **Authenticate and Connect to WebSocket:**

    - Open the browser console: Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
    - Authenticate using GraphQL mutations (SignUp or SignIn).
    - Establish a WebSocket connection with:

    ```javascript
    // Connect to WebSocket using the access token obtained during authentication
    let ws = new WebSocket(
    	"ws://localhost:4000/?token=SuperDuperUser%20<ACCESS TOKEN>",
    );
    // Listen to incoming messages
    ws.onmessage = (message) => console.log(JSON.parse(message.data));
    ```

4. **Example WebSocket Protocol:**
   To join a specific room and listen for new messages, use the following example WebSocket protocol:

    ```javascript
    // Listen to room messages by specifying its ID (either joined or created by you using GraphQL)
    let message = { type: "JOIN_ROOM", payload: [{ name: "<ROOM ID>" }] };
    ws.send(JSON.stringify(message));
    ```
