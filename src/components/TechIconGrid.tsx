import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TechModal from './modals/TechModal';
import { 
  Server, 
  Code, 
  Rocket, 
  Mail, 
  Database, 
  Layers, 
  Shield, 
  GitBranch, 
  Lock, 
  FileCheck, 
  Cpu, 
  Hammer, 
  TestTube, 
  Cloud, 
  Box, 
  Package, 
  Workflow,
  Terminal,
  Command,
  Globe,
  Bug,
  CheckSquare,
  Layout,
  Clock,
  Loader,
  Bird,
  Eye,
  FileJson,
  Tags,
  FileCode,
  FileType,
  Folder,
  Key,
  Store,
  Send,
  AlertCircle,
  HelpCircle,
  CircleDot,
  Smile,
  Trash2,
  RefreshCw,
  SendHorizontal,
  CheckCircle,
  MessageSquare,
  Underline,
  Router,
  File,
  Wrench,
  Radio,
  Zap,
  Palette
} from 'lucide-react';

interface TechnologyDetails {
  name: string;
  icon: React.ElementType;
  color: string;
  command: string;
  description: string;
  purpose: string;
  codeExample: string;
  docsUrl: string;
}

const technologies: TechnologyDetails[] = [
  {
    name: 'Express',
    icon: Server,
    color: 'text-green-400',
    command: 'npm install express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    purpose: 'Build web applications and APIs quickly and easily',
    codeExample: `# Basic Express setup
npm install express

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    docsUrl: '/signin'
  },
  {
    name: 'React',
    icon: Code,
    color: 'text-blue-400',
    command: 'npm install react react-dom',
    description: 'A JavaScript library for building user interfaces',
    purpose: 'Create interactive UIs with efficient updates and rendering',
    codeExample: `# Basic React setup
npm install react react-dom

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
    docsUrl: '/signin'
  },
  {
    name: 'TypeScript',
    icon: FileType,
    color: 'text-purple-400',
    command: 'npm install typescript',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript',
    purpose: 'Add static types to JavaScript for better development experience',
    codeExample: `# Basic TypeScript setup
npm install typescript

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true
  }
}

// Example TypeScript code
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}`,
    docsUrl: '/signin'
  },
  {
    name: 'Axios',
    icon: Globe,
    color: 'text-yellow-400',
    command: 'npm install axios',
    description: 'Promise-based HTTP client for browser and Node.js',
    purpose: 'Make HTTP requests with a clean, simple API',
    codeExample: `# Basic Axios usage
npm install axios

const axios = require('axios');

// Make GET request
async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// POST request with data
axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));`,
    docsUrl: '/signin'
  },
  {
    name: 'Jest',
    icon: TestTube,
    color: 'text-red-400',
    command: 'npm install jest',
    description: 'Delightful JavaScript Testing Framework',
    purpose: 'Write and run tests for JavaScript code',
    codeExample: `# Basic Jest setup
npm install jest

// sum.test.js
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// package.json
{
  "scripts": {
    "test": "jest"
  }
}

// Run tests
npm test`,
    docsUrl: '/signin'
  },
  {
    name: 'Lodash',
    icon: Box,
    color: 'text-gray-400',
    command: 'npm install lodash',
    description: 'A modern JavaScript utility library delivering modularity, performance & extras',
    purpose: 'Simplify working with arrays, numbers, objects, strings, etc.',
    codeExample: `# Basic Lodash usage
npm install lodash

const _ = require('lodash');

// Array operations
const numbers = [1, 2, 3, 4, 5];
const evens = _.filter(numbers, n => n % 2 === 0);

// Object handling
const user = _.merge({ name: 'John' }, { age: 30 });
console.log(_.get(user, 'name', 'default'));`,
    docsUrl: '/signin'
  },
  {
    name: 'Mongoose',
    icon: Database,
    color: 'text-green-500',
    command: 'npm install mongoose',
    description: 'Elegant MongoDB object modeling for Node.js',
    purpose: 'Interact with MongoDB databases using a schema-based approach',
    codeExample: `# Basic Mongoose setup
npm install mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Create a new user
const user = new User({
  name: 'John Doe',
  email: 'john@example.com'
});

await user.save();`,
    docsUrl: '/signin'
  },
  {
    name: 'Socket.io',
    icon: Radio,
    color: 'text-pink-400',
    command: 'npm install socket.io',
    description: 'Real-time bidirectional event-based communication',
    purpose: 'Enable real-time communication between web clients and servers',
    codeExample: `# Basic Socket.io setup
npm install socket.io

// Server
const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('User connected');
  
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

// Client
const socket = io('http://localhost:3000');
socket.emit('chat message', 'Hello!');
socket.on('chat message', msg => {
  console.log(msg);
});`,
    docsUrl: '/signin'
  },
  {
    name: 'ESLint',
    icon: AlertCircle,
    color: 'text-orange-400',
    command: 'npm install eslint',
    description: 'Pluggable JavaScript linting utility',
    purpose: 'Find and fix problems in your JavaScript code',
    codeExample: `# Basic ESLint setup
npm install eslint
npx eslint --init

// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
}

// Run ESLint
npx eslint src/`,
    docsUrl: '/signin'
  },
  {
    name: 'Dotenv',
    icon: File,
    color: 'text-gray-400',
    command: 'npm install dotenv',
    description: 'Loads environment variables from .env file',
    purpose: 'Manage application configuration and secrets',
    codeExample: `# Basic Dotenv setup
npm install dotenv

// Create .env file
DB_HOST=localhost
API_KEY=your_secret_key

// In your app
require('dotenv').config();
console.log(process.env.DB_HOST);
console.log(process.env.API_KEY);`,
    docsUrl: '/signin'
  },
  {
    name: 'Winston',
    icon: MessageSquare,
    color: 'text-yellow-400',
    command: 'npm install winston',
    description: 'A logger for just about everything',
    purpose: 'Universal logging library with support for multiple transports',
    codeExample: `# Basic Winston setup
npm install winston

const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});`,
    docsUrl: '/signin'
  },
  {
    name: 'Chalk',
    icon: Terminal,
    color: 'text-yellow-400',
    command: 'npm install chalk',
    description: 'Terminal string styling library',
    purpose: 'Style console output with colors and formatting',
    codeExample: `# Basic Chalk usage
npm install chalk

const chalk = require('chalk');

// Style your console output
console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));
console.log(chalk.blue.bgRed.bold('Important message'));
console.log(chalk.green('Success ✔'));

// Compose multiple styles
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
console.log(error('Error!'));
console.log(warning('Warning!'));`,
    docsUrl: '/signin'
  },
  {
    name: 'Commander',
    icon: Command,
    color: 'text-pink-400',
    command: 'npm install commander',
    description: 'Complete solution for Node.js command-line interfaces',
    purpose: 'Build powerful CLI applications with ease',
    codeExample: `# Basic Commander usage
npm install commander

const { program } = require('commander');

program
  .version('1.0.0')
  .description('CLI application example')
  .option('-n, --name <name>', 'your name')
  .option('-a, --age <age>', 'your age')
  .requiredOption('-u, --username <username>', 'username is required');

program
  .command('greet')
  .description('Greet the user')
  .action((options) => {
    console.log(\`Hello, \${program.opts().name}!\`);
  });

program.parse(process.argv);`,
    docsUrl: '/signin'
  },
  {
    name: 'Debug',
    icon: Bug,
    color: 'text-red-400',
    command: 'npm install debug',
    description: 'Tiny debugging utility',
    purpose: 'Add namespaced debugging output to your applications',
    codeExample: `# Basic Debug usage
npm install debug

const debug = require('debug')('app:main');

// Enable debugging with environment variable
// DEBUG=app:main node app.js

debug('Application starting...');
debug('Loading configuration...');

// Create namespace for different parts
const dbDebug = require('debug')('app:db');
dbDebug('Connected to database');

// Enable multiple namespaces
// DEBUG=app:main,app:db node app.js`,
    docsUrl: '/signin'
  },
  {
    name: 'PropTypes',
    icon: CheckSquare,
    color: 'text-purple-400',
    command: 'npm install prop-types',
    description: 'Runtime type checking for React props',
    purpose: 'Validate props passed to React components',
    codeExample: `# Basic PropTypes usage
npm install prop-types

import PropTypes from 'prop-types';

function User({ name, age, email, friends }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Friends: {friends.length}</p>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired,
  friends: PropTypes.arrayOf(PropTypes.string)
};`,
    docsUrl: '/signin'
  },
  {
    name: 'React DOM',
    icon: Layout,
    color: 'text-blue-400',
    command: 'npm install react-dom',
    description: 'React package for working with the DOM',
    purpose: 'Render React components in the browser',
    codeExample: `# Basic React DOM usage
npm install react react-dom

import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    docsUrl: '/signin'
  },
  {
    name: 'Moment',
    icon: Clock,
    color: 'text-yellow-400',
    command: 'npm install moment',
    description: 'Parse, validate, manipulate, and display dates',
    purpose: 'Handle dates and times in JavaScript',
    codeExample: `# Basic Moment usage
npm install moment

const moment = require('moment');

// Current date and time
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

// Parse dates
const date = moment('2023-01-01');
console.log(date.fromNow());

// Manipulate dates
console.log(moment().add(7, 'days').calendar());
console.log(moment().subtract(1, 'months').format('LL'));

// Validate dates
console.log(moment('2023-13-01').isValid()); // false`,
    docsUrl: '/signin'
  },
  {
    name: 'Async',
    icon: Loader,
    color: 'text-gray-400',
    command: 'npm install async',
    description: 'Utility module for working with asynchronous JavaScript',
    purpose: 'Manage asynchronous operations with powerful patterns',
    codeExample: `# Basic Async usage
npm install async

const async = require('async');

// Parallel execution
async.parallel([
  function(callback) {
    setTimeout(() => {
      callback(null, 'one');
    }, 200);
  },
  function(callback) {
    setTimeout(() => {
      callback(null, 'two');
    }, 100);
  }
], function(err, results) {
  console.log(results); // ['one', 'two']
});

// Series execution
async.series([
  function(callback) {
    setTimeout(() => {
      callback(null, 'first');
    }, 100);
  },
  function(callback) {
    setTimeout(() => {
      callback(null, 'second');
    }, 200);
  }
], function(err, results) {
  console.log(results); // ['first', 'second']
});`,
    docsUrl: '/signin'
  },
  {
    name: 'Bluebird',
    icon: Bird,
    color: 'text-pink-400',
    command: 'npm install bluebird',
    description: 'Full featured promise library with performance',
    purpose: 'Handle promises with extended functionality and better performance',
    codeExample: `# Basic Bluebird usage
npm install bluebird

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

async function readFiles() {
  try {
    // Read multiple files in parallel
    const [file1, file2] = await Promise.all([
      fs.readFileAsync('file1.txt', 'utf8'),
      fs.readFileAsync('file2.txt', 'utf8')
    ]);
    
    console.log(file1, file2);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Use Promise.map with concurrency
const urls = ['url1', 'url2', 'url3'];
Promise.map(urls, url => fetch(url), {concurrency: 2});`,
    docsUrl: '/signin'
  },
  {
    name: 'Vue',
    icon: Eye,
    color: 'text-purple-400',
    command: 'npm install vue',
    description: 'Progressive JavaScript framework for building user interfaces',
    purpose: 'Create dynamic web applications with a gentle learning curve',
    codeExample: `# Basic Vue usage
npm install vue

// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// App.vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="reverseMessage">
      Reverse Message
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    }
  }
}
</script>`,
    docsUrl: '/signin'
  },
  {
    name: 'jQuery',
    icon: Database,
    color: 'text-green-500',
    command: 'npm install jquery',
    description: 'Fast, small, and feature-rich JavaScript library',
    purpose: 'Simplify HTML document traversing and manipulation',
    codeExample: `# Basic jQuery usage
npm install jquery

// Include jQuery
import $ from 'jquery';

// DOM Ready
$(document).ready(function() {
  // Select and manipulate elements
  $('#myButton').click(function() {
    $('.content').fadeOut('slow');
  });

  // AJAX request
  $.ajax({
    url: '/api/data',
    method: 'GET',
    success: function(response) {
      $('#result').html(response);
    },
    error: function(xhr, status, error) {
      console.error('Error:', error);
    }
  });
});`,
    docsUrl: '/signin'
  },
  {
    name: 'RxJS',
    icon: Terminal,
    color: 'text-pink-400',
    command: 'npm install rxjs',
    description: 'Reactive Extensions Library for JavaScript',
    purpose: 'Handle async data streams with observable sequences',
    codeExample: `# Basic RxJS usage
npm install rxjs

import { fromEvent, interval } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Create observable from events
const searchInput = document.querySelector('input');
const searchEvents = fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value),
  debounceTime(400),
  distinctUntilChanged()
);

searchEvents.subscribe(value => {
  console.log('Search term:', value);
});

// Timer example
const timer = interval(1000);
timer.subscribe(value => console.log(value));`,
    docsUrl: '/signin'
  },
  {
    name: 'body-parser',
    icon: FileJson,
    color: 'text-gray-400',
    command: 'npm install body-parser',
    description: 'Node.js body parsing middleware',
    purpose: 'Parse incoming request bodies in a middleware',
    codeExample: `# Basic Body Parser setup
npm install body-parser

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});`,
    docsUrl: '/signin'
  },
  {
    name: 'core-js',
    icon: Cpu,
    color: 'text-purple-400',
    command: 'npm install core-js',
    description: 'Modular standard library for JavaScript',
    purpose: 'Polyfill ECMAScript features for older browsers',
    codeExample: `# Basic Core-js usage
npm install core-js

// Import specific features
import 'core-js/features/array/flat';
import 'core-js/features/string/pad-start';

// Or import everything
import 'core-js';

// Use modern features safely
const array = [1, [2, 3], [4, [5]]];
console.log(array.flat(2)); // [1, 2, 3, 4, 5]

const str = '42';
console.log(str.padStart(5, '0')); // '00042'`,
    docsUrl: '/signin'
  },
  {
    name: 'cheerio',
    icon: Smile,
    color: 'text-gray-400',
    command: 'npm install cheerio',
    description: 'Fast, flexible & lean implementation of core jQuery for the server',
    purpose: 'Parse and manipulate HTML and XML in Node.js',
    codeExample: `# Basic Cheerio usage
npm install cheerio

const cheerio = require('cheerio');

// Load HTML
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// Query elements
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

// Extract data
const html = $.html();
console.log(html);
// <h2 class="title welcome">Hello there!</h2>`,
    docsUrl: '/signin'
  },
  {
    name: 'rimraf',
    icon: Trash2,
    color: 'text-red-400',
    command: 'npm install rimraf',
    description: 'The UNIX command rm -rf for node',
    purpose: 'Deep delete files and directories in Node.js',
    codeExample: `# Basic Rimraf usage
npm install rimraf

const rimraf = require('rimraf');

// Delete a directory
rimraf('./build', (error) => {
  if (error) console.error('Error:', error);
  console.log('Build directory deleted');
});

// Use with promise
const util = require('util');
const rimrafAsync = util.promisify(rimraf);

async function cleanBuild() {
  await rimrafAsync('./build');
  console.log('Build directory cleaned');
}`,
    docsUrl: '/signin'
  },
  {
    name: 'inquirer',
    icon: HelpCircle,
    color: 'text-pink-400',
    command: 'npm install inquirer',
    description: 'A collection of common interactive command line user interfaces',
    purpose: 'Create interactive CLI prompts',
    codeExample: `# Basic Inquirer usage
npm install inquirer

const inquirer = require('inquirer');

async function askQuestions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your name?'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose a programming language:',
      choices: ['JavaScript', 'Python', 'Java']
    },
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Are you sure?'
    }
  ]);

  console.log('Answers:', answers);
}

askQuestions();`,
    docsUrl: '/signin'
  },
  {
    name: 'validator',
    icon: CheckCircle,
    color: 'text-green-400',
    command: 'npm install validator',
    description: 'String validation and sanitization',
    purpose: 'Validate and sanitize strings in JavaScript',
    codeExample: `# Basic Validator usage
npm install validator

const validator = require('validator');

// Validate email
console.log(validator.isEmail('test@email.com')); // true

// Check if URL
console.log(validator.isURL('https://example.com')); // true

// Sanitize string
const dirty = '<script>alert("xss")</script>';
console.log(validator.escape(dirty));

// Check password strength
console.log(validator.isStrongPassword('Pass123!'));`,
    docsUrl: '/signin'
  },
  {
    name: 'jsonwebtoken',
    icon: Key,
    color: 'text-purple-400',
    command: 'npm install jsonwebtoken',
    description: 'JSON Web Token implementation for Node.js',
    purpose: 'Create and verify authentication tokens',
    codeExample: `# Basic JWT usage
npm install jsonwebtoken

const jwt = require('jsonwebtoken');

// Create a token
const secret = 'your-secret-key';
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  secret,
  { expiresIn: '24h' }
);

// Verify token
try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch(err) {
  console.error('Token verification failed');
}`,
    docsUrl: '/signin'
  },
  {
    name: 'moment-timezone',
    icon: Clock,
    color: 'text-yellow-400',
    command: 'npm install moment-timezone',
    description: 'Parse and display dates in any timezone',
    purpose: 'Handle dates and times across different timezones',
    codeExample: `# Basic Moment-Timezone usage
npm install moment-timezone

const moment = require('moment-timezone');

// Get current time in different zones
console.log(moment().tz('America/New_York').format());
console.log(moment().tz('Asia/Tokyo').format());

// Convert between timezones
const nyTime = moment.tz('2023-01-01 12:00', 'America/New_York');
const tokyoTime = nyTime.clone().tz('Asia/Tokyo');
console.log(tokyoTime.format());`,
    docsUrl: '/signin'
  },
  {
    name: 'semver',
    icon: Tags,
    color: 'text-purple-400',
    command: 'npm install semver',
    description: 'Semantic Versioning for Node.js',
    purpose: 'Parse and compare semantic version numbers',
    codeExample: `# Basic Semver usage
npm install semver

const semver = require('semver');

// Compare versions
console.log(semver.gt('2.0.0', '1.0.0')); // true
console.log(semver.satisfies('1.2.3', '^1.0.0')); // true

// Clean version strings
console.log(semver.clean('  =v1.2.3   '));

// Check valid versions
console.log(semver.valid('1.2.3')); // '1.2.3'
console.log(semver.valid('a.b.c')); // null`,
    docsUrl: '/signin'
  },
  {
    name: 'webpack',
    icon: Package,
    color: 'text-yellow-400',
    command: 'npm install webpack webpack-cli',
    description: 'Static module bundler for modern JavaScript applications',
    purpose: 'Bundle JavaScript files and assets for production',
    codeExample: `# Basic Webpack setup
npm install webpack webpack-cli

// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

// Run webpack
npx webpack`,
    docsUrl: '/signin'
  },
  {
    name: 'babel',
    icon: FileCode,
    color: 'text-purple-400',
    command: 'npm install @babel/core @babel/cli @babel/preset-env',
    description: 'JavaScript compiler for backwards compatibility',
    purpose: 'Transform modern JavaScript into compatible versions',
    codeExample: `# Basic Babel setup
npm install @babel/core @babel/cli @babel/preset-env

// babel.config.json
{
  "presets": ["@babel/preset-env"]
}

// Modern JavaScript
const arrow = () => {
  const x = [1, 2, 3];
  return [...x, 4];
};

// Compile with Babel
npx babel src -d dist

// Use with webpack
module: {
  rules: [
    {
      test: /\\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
}`,
    docsUrl: '/signin'
  },
  {
    name: 'prettier',
    icon: Layout,
    color: 'text-yellow-400',
    command: 'npm install prettier',
    description: 'Opinionated code formatter',
    purpose: 'Maintain consistent code style across your project',
    codeExample: `# Basic Prettier setup
npm install prettier

// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}

// Format files
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"

// Add to package.json
{
  "scripts": {
    "format": "prettier --write ."
  }
}`,
    docsUrl: '/signin'
  },
  {
    name: 'next.js',
    icon: Globe,
    color: 'text-yellow-400',
    command: 'npx create-next-app@latest',
    description: 'The React Framework for Production',
    purpose: 'Build server-side rendered and static React applications',
    codeExample: `# Create Next.js app
npx create-next-app@latest my-next-app

// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  );
}

// API Route
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}`,
    docsUrl: '/signin'
  },
  {
    name: 'pm2',
    icon: Command,
    color: 'text-pink-400',
    command: 'npm install pm2 -g',
    description: 'Production process manager for Node.js',
    purpose: 'Keep Node.js applications alive in production',
    codeExample: `# Basic PM2 usage
npm install pm2 -g

// Start an application
pm2 start app.js

// Cluster mode
pm2 start app.js -i max

// Process management
pm2 list
pm2 monit
pm2 logs
pm2 restart app
pm2 stop app
pm2 delete app

// Save process list
pm2 save

// Startup script
pm2 startup`,
    docsUrl: '/signin'
  },
  {
    name: 'passport',
    icon: Key,
    color: 'text-purple-400',
    command: 'npm install passport passport-local',
    description: 'Simple, unobtrusive authentication for Node.js',
    purpose: 'Add authentication strategies to Node.js applications',
    codeExample: `# Basic Passport setup
npm install passport passport-local

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

// Use in Express
app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);`,
    docsUrl: '/signin'
  },
  {
    name: 'prisma',
    icon: Database,
    color: 'text-green-500',
    command: 'npm install prisma',
    description: 'Next-generation Node.js and TypeScript ORM',
    purpose: 'Modern database toolkit for TypeScript and Node.js',
    codeExample: `# Basic Prisma setup
npm install prisma
npx prisma init

// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}

// Use in code
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()`,
    docsUrl: '/signin'
  },
  {
    name: 'graphql',
    icon: Globe,
    color: 'text-purple-400',
    command: 'npm install graphql apollo-server',
    description: 'Query language for your API',
    purpose: 'Build flexible and efficient APIs',
    codeExample: `# Basic GraphQL setup
npm install graphql apollo-server

const { ApolloServer, gql } = require('apollo-server');

// Define schema
const typeDefs = gql\`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
\`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});`,
    docsUrl: '/signin'
  },
  {
    name: 'vite',
    icon: Zap,
    color: 'text-yellow-400',
    command: 'npm create vite@latest',
    description: 'Next Generation Frontend Tooling',
    purpose: 'Modern build tool that offers a faster development experience',
    codeExample: `# Create Vite project
npm create vite@latest my-app
cd my-app

# Configure Vite (vite.config.js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})

# Start development
npm run dev`,
    docsUrl: '/signin'
  },
  {
    name: 'storybook',
    icon: Layout,
    color: 'text-purple-400',
    command: 'npx storybook@latest init',
    description: 'UI component development environment',
    purpose: 'Develop and test UI components in isolation',
    codeExample: `# Initialize Storybook
npx storybook@latest init

// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    primary: true,
    label: 'Button',
  },
};

// Run Storybook
npm run storybook`,
    docsUrl: '/signin'
  },
  {
    name: 'tailwindcss',
    icon: Palette,
    color: 'text-pink-400',
    command: 'npm install tailwindcss',
    description: 'Utility-first CSS framework',
    purpose: 'Rapidly build modern websites without leaving HTML',
    codeExample: `# Install Tailwind CSS
npm install tailwindcss
npx tailwindcss init

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// Use in HTML
<div class="flex items-center justify-center">
  <button class="bg-blue-500 hover:bg-blue-700 
    text-white font-bold py-2 px-4 rounded">
    Click me
  </button>
</div>`,
    docsUrl: '/signin'
  },
  {
    name: 'cypress',
    icon: TestTube,
    color: 'text-red-400',
    command: 'npm install cypress --save-dev',
    description: 'Modern end-to-end testing framework',
    purpose: 'Write and run end-to-end tests for web applications',
    codeExample: `# Install Cypress
npm install cypress --save-dev

// Add to package.json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}

// Write a test (cypress/e2e/spec.cy.js)
describe('My First Test', () => {
  it('Visits the homepage', () => {
    cy.visit('http://localhost:3000')
    
    cy.get('h1')
      .should('exist')
      .and('contain', 'Welcome')
    
    cy.get('button').click()
  })
})

// Run tests
npm run cypress:open`,
    docsUrl: '/signin'
  },
  {
    name: 'zustand',
    icon: Store,
    color: 'text-gray-400',
    command: 'npm install zustand',
    description: 'Small, fast state-management solution',
    purpose: 'Simple and unopinionated state management for React',
    codeExample: `# Install Zustand
npm install zustand

// Create a store
import create from 'zustand'

interface BearStore {
  bears: number
  increase: () => void
}

const useStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ 
    bears: state.bears + 1 
  })),
}))

// Use in component
function BearCounter() {
  const bears = useStore((state) => state.bears)
  const increase = useStore((state) => state.increase)
  
  return (
    <div>
      <h1>{bears} bears</h1>
      <button onClick={increase}>Add bear</button>
    </div>
  )
}`,
    docsUrl: '/signin'
  },
  {
    name: 'dotenv',
    icon: File,
    color: 'text-gray-400',
    command: 'npm install dotenv',
    description: 'Loads environment variables from .env file',
    purpose: 'Manage application configuration and secrets',
    codeExample: `# Basic Dotenv setup
npm install dotenv

// Create .env file
DB_HOST=localhost
API_KEY=your_secret_key

// In your app
require('dotenv').config()

// Access variables
const dbHost = process.env.DB_HOST
const apiKey = process.env.API_KEY

// Best practices
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret-key
NODE_ENV=development`,
    docsUrl: '/signin'
  }
];

interface TechIconGridProps {
  onSelect: (command: string) => void;
}

const TechIconGrid: React.FC<TechIconGridProps> = ({ onSelect }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechnologyDetails | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startScrolling = () => {
      scrollInterval.current = setInterval(() => {
        if (!isPaused && container) {
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        }
      }, 30);
    };

    startScrolling();

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isPaused]);

  const handleTechClick = (tech: TechnologyDetails) => {
    setSelectedTech(tech);
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-2 w-full mx-auto mt-[-50px]"
        style={{
          minWidth: '100%',
          width: '100vw',
          maxWidth: '100%',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide w-full"
        >
          <div className="flex space-x-2 py-2 w-full">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => handleTechClick(tech)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 ${tech.color}`} />
                  <span className="text-sm text-gray-300 whitespace-nowrap">{tech.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {selectedTech && (
        <TechModal
          isOpen={selectedTech !== null}
          onClose={() => setSelectedTech(null)}
          tech={selectedTech}
          onCopy={onSelect}
        />
      )}
    </>
  );
};

export default TechIconGrid;
