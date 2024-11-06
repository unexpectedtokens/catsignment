# Catsignment - Sample application making use of the The Cat API

This API was set up in an MVC-ish pattern, in three layers:

- Controller: Application logic
- Services: Business logic
- Store/Model: Database access

For such a small app, it seems like a lot of work for something that could be done in a couple files. But for a codebase to be able to grow, it's important to seperate concerns so that there can be predictability. Knowing what kind of logic goes where makes it easier to maintain or alter it later on because you'll know where to look.

What would have been next:

- Working with interfaces so there can be dependency injection. This makes it easier to test each layer
- Implementing some sort of context passing through the layers. This way there can be things like request scoped logging (tracing logs for a specific requests) or cancellation

## To start The application

There's two ways to run the application

### As a standalone process

Run

    bun install

to install all dependencies

Create a .env and specify the following variables `DATABASE_URL`, `PORT` and `CAT_API_KEY`

To generate prisma client code (types and such) run

    bunx prisma generate

Then to setup the database

    bunx prisma migrate dev --name init

Run

    bun start

or for devevelopment (watch-mode)

    bun dev

### With Docker Compose (currently unavailable)

I had a working containerized version which broke after implementing Prisma. Something with a mismatch between generated code for MacOS and Linux (inside the container). After wasting a bit too much time trying to fix it, I focused on finishing the app itself instead.

Make sure to provide a CAT_API_KEY env var.

#### Production environment

This doesn't load env vars based on a .env file, as this construction wouldn't/shouldn't be used in a production environment. Variables the app depends on (db, port, api-keys) should be provisioned in a different way.

Run

    bun compose-prod

Before deploying in a production-like environment, make sure to provide non-default Postgres credentials.

You can provide a custom port if needed, default port is 3000

#### Development environment

Create a .env with the CAT_API_KEY var, the docker compose will look for this

Run

    bun compose-dev

The only difference is that the database url can't be modified and that the bun process will restart on file change (uses package.json `bun dev` command)

## Documentation

With the app running, visit `/swagger` to view all available endpoints and their in/output
