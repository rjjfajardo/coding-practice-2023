## Getting Started

## FRONTEND

Install dependencies

```bash
npm install
```

Second, run the frontend development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## BACKEND

Install dependencies

```bash
yarn install
```

Add .env file and replace the values for DATABASE_URL (see env.example)

After configuring the variables run `yarn prisma migrate`

Then, run the backend development server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Generate database ERD

`yarn prisma generate`

Then go to prisma folder under /dbml copy the content inside schema.dbl and then base to [Db Diagram](https://dbdiagram.io/d)
