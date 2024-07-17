
# Project Manager Discounts
Welcome to Manager Discounts repository 💵

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)
  
## Introduction

This application was created by me Allan Hipólito. It allows users to manager discounts of products you can create, activate or desactivate, upload photo from product and change all data. If you reload a page your data not  will be lose. All of this with a coverage of test 80%.
## Technologies Used
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

### Frontend
- **Next.js**: A React framework that enables server-side rendering and static site generation, with features like API routes and built-in CSS support.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **Uploadthing**: A tool to simplify file uploads to the cloud, easily integrating with various storage providers.
- **Jest & React Testing Library**: A JavaScript testing framework to ensure code correctness, while React Testing Library provides utilities to test React components by simulating user interactions.
- **React Hook Form & Yup**: A library for managing form state and validation in React applications, with Yup being a schema builder for validation and parsing values, simplifying the handling of complex forms.

## Configure the enviroment variables
First, create an account on [uploadThing](https://uploadthing.com/), save the settings, and create a `.env.local` file with them.

```bash
UPLOADTHING_SECRET=sua secretKey
UPLOADTHING_APP_ID=seu appId
```

## Installation


Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/7ipolito/cresce_cuts.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd cresce_cuts
   ```

3. **Install the dependencies**:

   - For install both dependecies run:
   
   ```bash
   npm install
   ```

## Running the Application
- **To run**:

 ```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This starts the React application on `http://localhost:3000` (or another available port).


## Conclusion

I hope that you to enjoy this project, he was designed with best practices using all features that i had knowledgment.
