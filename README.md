# Reservation API

This project is a simple REST API for managing reservations 
from a given object. It fulfills the requirements outlined 
in the provided [description](./docs/Tech%20Assignment.pdf).

## Requirements

To run this project, you need to have the following tools installed:

- Node.js
- pnpm package manager
- Docker

## Getting Started

To launch the project, follow these steps:

- Clone the repository from GitHub.
- Navigate to the project directory.
- Install dependencies using pnpm install.
- Launch the project using Docker Compose with the command `docker-compose up`.

## Docker Deployment

The project is dockerized for easy deployment. Simply run `docker-compose up` 
in the project directory to launch the API container. Additional tools
can be launched by specifying them with `COMPOSE_PROFILES` variable.
For example, to launch pgadmin, set `COMPOSE_PROFILES=pgadmin`.
