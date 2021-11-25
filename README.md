# Bosta Backend Assessment!

This is **MonitorBot**, a RESTful API server to monitor URLs and notify users whenever the status code changes and generate reports to analyze the availability, response time, and more of these URLs.

Currently, the users can be notified by **mail**, **webhooks**, or **pushover**, after creating an account the user receives an email to verify his/her account, then the user can monitor any number of URLs and stop and restart monitoring.

### You can find complete documentation of the available endpoints **[here](https://documenter.getpostman.com/view/16084742/UVJZpej9#5a67ac0d-2819-4eb8-82df-5a0c1b79c344)**.

# **How to run the project**

There are two ways to run that project:

## **1- Using docker-compose (the recommended one)**

- Download the docker-compose file from **[here](https://drive.google.com/file/d/1kIeGberJWFSlUiSNggkYF_acPQt0b7-_/view?usp=sharing)**
- Open the terminal in the same directory and hit `docker-compose up` and the server will be listening on port **3000**

> **Note:** You have to provide a real SendGrid key and verified email inside the docker-compose.yml file placeholders, otherwise, all the mails will be replaced by dummy console logs.

## 2- Cloning The Repo

- Open the terminal and hit `git clone https://github.com/mohieey/bosta-task.git`
- `cd bosta-task`
- `npm i`
- `npm start`
- Now, the server is up and running on port **3000**

> **Note:** You have to provide the following environment variables:
> SendGrid key under the name **mailKey**, otherwise, all the mails will be replaced by dummy console logs.
> Verified email to send messages from under the name **fromMail**, otherwise, all the mails will be replaced by dummy console logs.
> A valid MongoDB connection string under the name **MongoConnectionString**, otherwise, the server will terminate.

# How to run the tests:

## 1- If you are using docker-compose

Open a shell session inside the server’s running container and hit `npm run test`

## 2- If you are using the cloned repo

Having all the modules installed, open the package.json file and provide a valid MongoDB connection string in the test script then hit ``npm run test` inside the same directory of the project.

# Used npm modules

## 1- express

## 2-@sendgrid/mail

## 3- node-pushover

## 4- mongoose

## 5- jest

## 6- supertest

## 7- joi

## 8- jsonwebtoken

## 9- axios
