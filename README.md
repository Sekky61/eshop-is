# Information system for eshop

Originally a project for the PIS class @ VUT FIT 2022/23. 
Authors: Petr Pouč, Jan Polišenský, Jan Zádrapa, Michal Majer

Refactored version by Michal Majer.

## Frontend

Frontend uses [Next.js](https://nextjs.org/).
You need [Node.js](https://nodejs.org/en/) installed.

### Setup and running

To run the development server, run:
```bash
cd frontend
npm run dev
```

The frontend should be served on [http://localhost:3000](http://localhost:3000).

## Backend

You need .NET 7.0 SDK installed: [link for Ubuntu](https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu).

### Setup and running

```bash
cd backend
./run.sh
```

You can now inspect the API at [localhost:5024/graphql](http://localhost:5024/graphql/).

## Contributing

### Git flow

We use git flow for development.
There is a helpful [git flow plugin](https://github.com/nvie/gitflow) for git.
All you need to know is in this [git flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/).
You can read more about git flow [here](http://nvie.com/posts/a-successful-git-branching-model/).

After editing a query/mutation (file in `frontend/graphql/queries` or `frontend/graphql/mutations`), **run this command while backend is running**:
```
npm run generate
```

