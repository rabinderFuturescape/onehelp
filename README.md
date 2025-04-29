# Helpdesk Application

A modern helpdesk solution built with microservices architecture, following Clean Architecture and Hexagonal principles.

## Project Structure

- **helpdesk-api**: Backend API service built with Node.js, Express, TypeScript, and TypeORM
- **helpdesk-web**: Frontend web application built with Next.js, TypeScript, and Tailwind CSS
- **shared**: Shared types and utilities

## Services

The application consists of the following microservices:

1. **helpdesk-api**: RESTful API service for handling tickets, users, escalations, and verifications
2. **helpdesk-web**: Web client for interacting with the API
3. **Kong API Gateway**: API Gateway for routing requests to the appropriate service

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository
2. Run Docker Compose to start all services:

```bash
docker-compose up -d
```

3. Access the web application at http://localhost:3001
4. Access the API at http://localhost:8000/v1

## Development

### Backend (helpdesk-api)

```bash
cd helpdesk-api
npm install
npm run dev
```

### Frontend (helpdesk-web)

```bash
cd helpdesk-web
npm install
npm run dev
```

## Architecture

This project follows Clean Architecture and Hexagonal principles:

- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Contains use cases and service interfaces
- **Infrastructure Layer**: Contains implementations of repositories and services
- **Presentation Layer**: Contains controllers and routes for the API

## License

This project is licensed under the MIT License.
