# nextjs-react-base

- This project was created using create-next-app: https://nextjs.org/docs

## Why Next.Js?

- Next.js is a React-based framework that provides you with the tools you need for building websites /apps with server-side rendering (SSR), routing & data fetching.
- The NextJs framework also offers HTTP caching, linting and standardisation, SEO tools, and automatic code-splitting via dynamic imports or webpack bundles.
- Next.js is an open source framework that's based on Node.js and Babel.

In this lesson, you will learn how to create a React app with a Login page for User Authentication using Next.JS

## How to start a Next.Js project

- Change directory to a local folder where you want to run your project
- we are giong to create a new Next.js app using create-next-app and typescript, so type the command in the terminal:
  `npx create-next-app@latest --typescript`
- You will be prompted with a question like ...
- ````Need to install the latest following packages: create-next-app@latest
  Ok to proceed? (y)```
  ````
- Answer: Y and then you will be prompted with another question : `What is your project named?`
- Answer: nextjs-react-base
- A new Next.js app will be created complete with the following folders: /pages, /public & /styles
- After the project is created, run the following comamnd in the root of the project to start it up:
  `npm run dev` and then check it out at http://localhost:3000

## How to run the existing Next.Js project

-

### How to Add Login / Authentication to your Next.js app

- Create a components folder and an authentication folder inside it.
- Add a login-form.tsx file in the project
- Import the Login component in index.tsx, like :

```
import LoginForm from '../components/authentication/login-form';
```

- Display the login form inside index.tsx homepage using a command like:

```
<section className={styles.title}>
        <LoginForm></LoginForm>
</section>
```

-

### How to setup a Node Api for your Next.js app

- The authentication from the Login Form of your Next.js App will be handled by another Node.js + Express Api project which you can clone from the git repository at: https://github.com/stlouis-mo-developers/NodeExpressApi
- AFter you clone that repository, get it running using on your local host using: `npm start`
- View your Node Express Api at http://localhost:3010/
-

### How to create a login form inside a Next.js app

Let's take a look at login-form.jsx inside /components/authentication

- There are two input fields for the username and password needed for your login.
  These inputs are similar to each other and so, let's take a peek at the username input:
  `<input value={form.name} onChange={onChange} className="form-control" id="name" name="name" placeholder="Your username ..." type="text" autoComplete="false" />`
- As you type a username, the onChange event is triggered and the new values are evaluated / validated in the onChange() as well as the validate() functions
- Assuming that your username and password are valid, the Login button is enabled, otherwise it's disabled
- When you click on the Login button, the form values are then submitted / posted to the Node + Appress Api that you have running locally at http://localhost:3010/
- The click event on your form is trigegred when you click on the login button that calls a click() function which posts the Form data using the postFormJsonData() function.
- The processApiData() function evaluates the api result returned by postFormJsonData().
- If the api result includes an AuthID and Roles, then the Loading Spinner stops and the Login Form hides as the Login process is deemed successful otherwise the Login Form stays open & visible

### How do you host & run a Next.js project?

### References?

- 1. https://pagepro.co/blog/what-is-nextjs/ - WHAT IS NEXT JS AND WHY SHOULD YOU USE IT IN 2022?
- 2. https://kinsta.com/knowledgebase/next-js/

# nodeapi

Nextjs React Base

## Git Commands

## git remote -v

## Git Commands / Add username as a Collaborator for Repository

## git remote add dev1 https://github.com/kingsleytagbo/nextjs-react-base.git

## git pull dev1 main --allow-unrelated-histories

## git add --all

## git commit -am "first commit"

## git push --set-upstream dev1 main

## for second reporistory

- git remote add dev2 git@github.com:stlouis-mo-developers/nextjs-react-base.git
- git push -u dev2 main
- git push dev2 authentication

## git checkout -b authentication

## git push --set-upstream dev1 authentication

## References

### Visit: http://localhost:3010/api

### How to add Bootstrap 5 in Next.js: https://medium.com/nextjs/how-to-add-bootstrap-in-next-js-de997371fd9c

#### npm install bootstrap @latest --save

## Build Commands

npm run build
npm run start

## nextjs information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## References

- Create a NextJs project with Typescript, ESLint, Prettier https://www.sandromaglione.com/techblog/create-nextjs-project-with-typescript-eslint-prettier-tailwindcss
- - npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
- - npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-typescript
- [Next.js] Prettier https://dev-yakuza.posstree.com/en/react/nextjs/prettier/
- npm run prettier
- npm run prettier:fix

### Next.js SEO
- Incremental Static Generation: https://blog.logrocket.com/incremental-static-regeneration-next-js/

### Http Error Codes
#### 401 vs. 403 http error codes
https://www.freecodecamp.org/news/http-401-error-vs-http-403-error-status-code-responses-explained/
