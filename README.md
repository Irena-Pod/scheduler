# Interview Scheduler

**Interview Scheduler** is a single page application, built using React. It allows users to book, edit and cancel interviews.

Unit, integration and E2E tests were completed through the development of the project. Testing frameworks include:
- Storybook
- Jest
- Cypress

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Screenshots

##### Scheduler Main View
!["Scheduler main view"](https://github.com/Irena-Pod/scheduler/blob/master/docs/Interview_Scheduler_main_view.png?raw=true)

##### Add New Interview Form
!["Add new interview form"](https://github.com/Irena-Pod/scheduler/blob/master/docs/Add_new_interview_form.png?raw=true)

##### Edit/Delete Interview View (upon hover)
!["Edit/Delete interview view (upon hover)"](https://github.com/Irena-Pod/scheduler/blob/master/docs/Edit_or_delete_interview_view_hover.png?raw=true)


## Getting Started
### Setup

Install dependencies with `npm install`.

### Setup Interview Scheduler API

In a different directory, clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) and follow setup instructions

**Both scheduler client and scheduler server need to run the for application to work.**

#### Running Webpack Development Server

```sh
npm start
```

#### Running Jest Test Framework

```sh
npm test
```

#### Running Storybook Visual Testbed

```sh
npm run storybook
```
