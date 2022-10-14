# 💅 Signavio front-end coding challenge

Welcome to the Signavio front-end coding challenge!

We appreciate you taking the time and energy to work on this coding challenge ❤️

It consists of a small React.js application which shall be extended by you.

The next sections describe the three tasks and give some general hints.
At the end you can leave any comments about design decisions, instructions or general feedback.

## Task 0 - 🧰 Setup

**Before you start please read** through this document.

If something is unclear or you're stuck please do not hesitate to reach out to us: "reaching out to us" is not perceived negatively in any way. We believe that unclear requirements or ambiguous instructions should always be clarified.

The section called [example data](#example-data) is important: please **don't** change it!

## Task 1 - 🔎 Filtering

Users should be able to filter the table.
They expressed that every column should include an input field where they could type their search.
The table should then be filtered so that only rows that match the search term for the respective column are included.
Your task is to make this possible!

Make sure you start the test runner for the `Table` component.
The test suite includes some essential TODOs to help get started.

## Task 2 - 🗄️ Sorting

Your task is to add a feature that lets the user sort every column of the table.
If you click the column title for the first time it should sort this column in ascending order.
When you click the same title again this should toggle between ascending and descending.

Once again have a look at the test suite for the `Table` component.

## 📍 General hints

### 🎁 Installing dependencies

This project uses `yarn`.
You can run the following command to install all dependencies.

```sh
yarn install
```

### 🛠️ Running the dev server

To see what you're building run the following command:

```sh
yarn start
```

It will start the dev-server and open a page in your default browser.

### 🧪 Testing

This project uses [`jest`](https://jestjs.io/) as a test runner.
The tests are written using [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro).
Also, we have enhanced the `expects` with [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) to give you some more explicit assertions.

You can run all tests with the following command:

```sh
yarn test
```

### 🔮 Other libraries

Feel free to add any libraries you think are important.
But consider that we're interested in **your** coding skills: the balance between "building ourselves" and "not reinventing the wheel" makes for interesting conversations to follow up in the technical interview and code walkthrough.

If you solve the whole task with a library we will have some questions for you later on.

### 📦 Example data

Since there is no backend in this exercise all data comes from `./src/data.json`.

Do not change this file.

On a real world scenario, you could potentially argue with a backend developer to change the way the data is provided. For this specific exercise our focus in on how you would handle this data in the way you got it right now.

---

## 📝 Design decisions and feedback

_Here you can leave any comments about your design decisions, further instructions and comments as well as feedback._
