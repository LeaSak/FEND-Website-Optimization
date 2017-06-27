## Website Performance Optimization Portfolio Project

This aim of the project was to optimize the PageSpeed Insights score for index.html and to optimize the Frames per Second in pizza.html. See the project outline [here](https://github.com/udacity/frontend-nanodegree-mobile-portfolio). This project was built using **Gulp**.

### Getting started
------
First go to the master branch of the project and get a copy of the repository by either downloading the project files to your computer or via the command line.

```sh
$ git clone https://github.com/LeaSak/FEND-mobile-portfolio
```

If you just want to view the built website, go to the project's **dist** directory, and open **index.html** in your browser. If you wish to build the project, see below.

### View the PageSpeed Score at PageSpeed Insights
------
To test the PageSpeed Insights score of `index.html`, you'll need to set up a local server and use **ngrok**. If you have **NodeJS** installed, the [http-server](https://www.npmjs.com/package/http-server) package from **npm** is one local server option. Download and install **ngrok** [here](https://ngrok.com/) and move it to the top level of your project directory.

#### Step 1: Start your local server

To get started, run a local server, using **http-server**:

```sh
    $ cd /path/to/your-project-folder
    $ http-server -p8080
```
#### Step 2: Ngrok
Now get **ngrok** up and running:

```sh
    $ cd /path/to/your-project-folder
    $ ./ngrok http 8080
```
#### Step 5: PageSpeed Insights
Copy the public URL **ngrok** gives you and run it through [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).

### Build the Site
------
To build the website, you need to first setup your development environment.

#### Step 1: Install node.js, npm, Gulp
Make sure you have **node.js**, **npm**, and **gulp** installed. For instructions on how to install these consult the following links: [node](https://nodejs.org/en/), [npm](https://docs.npmjs.com/getting-started/installing-node), [gulp.js](http://gulpjs.com/)
*Note*: You do not need to create `package.json` and `gulpfile.js` files.

#### Step 2: Install Gulp Dependencies
Make sure you're in the project directory. Now we'll install the project's development dependencies.
To install the **Gulp** dependencies, run:
```sh
$ npm install.
```
You should now find these plugins in your node modules folder.

#### Step 3: Build
To build the site, run the following command within your project directory:
```sh
$ gulp build
```
