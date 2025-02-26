import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
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

const FloatingToolbarGrid: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechnologyDetails | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startScrolling = () => {
      scrollInterval.current = setInterval(() => {
        if (!isPaused && container) {
          // Smooth scroll to next position
          container.scrollBy({
            top: 1,
            behavior: 'smooth'
          });

          // Check if we need to reset to top
          if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
      }, 50); // Slightly slower interval for smoother scrolling
    };

    startScrolling();

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isPaused]);

  const technologies = [
    {
      name: 'Express.js',
      icon: Server,
      color: 'text-green-400',
      command: 'npm install express',
      description: 'Popular Node.js web framework for building web applications',
      purpose: 'Server-side',
      codeExample: 'const express = require("express");\nconst app = express();\napp.listen(3000, () => { console.log("Server started on port 3000"); });',
      docsUrl: 'https://expressjs.com/'
    },
    {
      name: 'React.js',
      icon: Code,
      color: 'text-blue-400',
      command: 'npm install react react-dom',
      description: 'JavaScript library for building user interfaces',
      purpose: 'Client-side',
      codeExample: 'import React from "react";\nimport ReactDOM from "react-dom";\nconst App = () => { return <div>Hello World!</div>; };\nReactDOM.render(<App />, document.getElementById("root"));',
      docsUrl: 'https://reactjs.org/'
    },
    {
      name: 'Next.js',
      icon: Rocket,
      color: 'text-white',
      command: 'npm install next',
      description: 'Popular React-based framework for building server-rendered and statically generated websites',
      purpose: 'Server-side',
      codeExample: 'npx create-next-app my-app\nnpm run dev',
      docsUrl: '/technologies/next'
    },
    {
      name: 'NodeMailer',
      icon: Mail,
      color: 'text-red-400',
      command: 'npm install nodemailer',
      description: 'Popular Node.js library for sending emails',
      purpose: 'Server-side',
      codeExample: 'const nodemailer = require("nodemailer");\nconst transporter = nodemailer.createTransport({ host: "smtp.example.com", port: 587, secure: false, auth: { user: "username", pass: "password" } });\nconst mailOptions = { from: "sender@example.com", to: "receiver@example.com", subject: "Hello", text: "Hello World!" };\ntransporter.sendMail(mailOptions, (error, info) => { if (error) { console.log(error); } else { console.log("Email sent: " + info.response); } });',
      docsUrl: '/technologies/nodemailer'
    },
    {
      name: 'MongoDB',
      icon: Database,
      color: 'text-green-500',
      command: 'npm install mongodb',
      description: 'Popular NoSQL database for storing and retrieving data',
      purpose: 'Database',
      codeExample: 'const MongoClient = require("mongodb").MongoClient;\nconst url = "mongodb://localhost:27017/";\nMongoClient.connect(url, (err, client) => { if (err) { console.log(err); } else { console.log("Connected to MongoDB"); } });',
      docsUrl: '/technologies/mongodb'
    },
    {
      name: 'Mongoose',
      icon: Layers,
      color: 'text-purple-400',
      command: 'npm install mongoose',
      description: 'Popular Node.js library for interacting with MongoDB',
      purpose: 'Database',
      codeExample: 'const mongoose = require("mongoose");\nmongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });\nconst userSchema = new mongoose.Schema({ name: String, email: String });\nconst User = mongoose.model("User", userSchema);',
      docsUrl: '/technologies/mongoose'
    },
    {
      name: 'Apollo Server',
      icon: Shield,
      color: 'text-indigo-400',
      command: 'npm install apollo-server',
      description: 'Popular GraphQL server for building APIs',
      purpose: 'Server-side',
      codeExample: 'const { ApolloServer } = require("apollo-server");\ntypeDefs = `type Query { hello: String }`;\nconst resolvers = { Query: { hello: () => "Hello World!" } };\nconst server = new ApolloServer({ typeDefs, resolvers });\nserver.listen().then(({ url }) => { console.log(`Server ready at ${url}`); });',
      docsUrl: '/technologies/apollo-server'
    },
    {
      name: 'Apollo Client',
      icon: GitBranch,
      color: 'text-pink-400',
      command: 'npm install @apollo/client',
      description: 'Popular GraphQL client for interacting with APIs',
      purpose: 'Client-side',
      codeExample: 'import { ApolloClient, InMemoryCache } from "@apollo/client";\nconst client = new ApolloClient({ uri: "https://api.example.com/graphql", cache: new InMemoryCache() });\nclient.query({ query: gql`query { hello }` }).then(result => console.log(result.data));',
      docsUrl: '/technologies/apollo-client'
    },
    {
      name: 'JWT',
      icon: Lock,
      color: 'text-yellow-400',
      command: 'npm install jsonwebtoken',
      description: 'Popular authentication token format for securing APIs',
      purpose: 'Security',
      codeExample: 'const jwt = require("jsonwebtoken");\ntoken = jwt.sign({ name: "John Doe", email: "john@example.com" }, "secretkey", { expiresIn: "1h" });\ndecoded = jwt.verify(token, "secretkey");',
      docsUrl: '/technologies/jwt'
    },
    {
      name: 'Passport.js',
      icon: FileCheck,
      color: 'text-blue-500',
      command: 'npm install passport',
      description: 'Popular Node.js library for authentication',
      purpose: 'Authentication',
      codeExample: 'const passport = require("passport");\npassport.use(new LocalStrategy((username, password, done) => { // authentication logic }));\npassport.serializeUser((user, done) => { done(null, user.id); });\npassport.deserializeUser((id, done) => { User.findById(id, (err, user) => { done(err, user); }); });',
      docsUrl: '/technologies/passport'
    },
    {
      name: 'Babel',
      icon: Cpu,
      color: 'text-yellow-500',
      command: 'npm install @babel/core @babel/cli',
      description: 'Popular JavaScript compiler for converting modern code to older syntax',
      purpose: 'Code Conversion',
      codeExample: 'const babel = require("@babel/core");\nconst code = "const add = (a, b) => a + b;";\nconst result = babel.transform(code, { presets: ["@babel/preset-env"] });',
      docsUrl: '/technologies/babel'
    },
    {
      name: 'Webpack',
      icon: Hammer,
      color: 'text-blue-600',
      command: 'npm install webpack webpack-cli',
      description: 'Popular JavaScript module bundler for building web applications',
      purpose: 'Module Bundling',
      codeExample: 'const webpack = require("webpack");\nconst config = { entry: "./src/index.js", output: { path: "./dist", filename: "bundle.js" } };\nwebpack(config).run((err, stats) => { if (err) { console.error(err); } else { console.log(stats); } });',
      docsUrl: '/technologies/webpack'
    },
    {
      name: 'ESLint',
      icon: TestTube,
      color: 'text-purple-500',
      command: 'npm install eslint',
      description: 'Popular JavaScript linter for enforcing coding standards',
      purpose: 'Code Quality',
      codeExample: 'const eslint = require("eslint");\nconst code = "const add = (a, b) => a + b;";\nconst result = eslint.lintText(code, { rules: { "no-console": "error" } });',
      docsUrl: '/technologies/eslint'
    },
    {
      name: 'Prettier',
      icon: FileCheck,
      color: 'text-blue-300',
      command: 'npm install prettier',
      description: 'Popular code formatter for enforcing coding standards',
      purpose: 'Code Formatting',
      codeExample: 'const prettier = require("prettier");\nconst code = "const add = (a, b) => a + b;";\nconst formattedCode = prettier.format(code, { parser: "babel" });',
      docsUrl: '/technologies/prettier'
    },
    {
      name: 'Jest',
      icon: TestTube,
      color: 'text-red-500',
      command: 'npm install jest',
      description: 'Popular JavaScript testing framework for writing unit tests',
      purpose: 'Testing',
      codeExample: 'const jest = require("jest");\nconst sum = (a, b) => a + b;\ntest("adds 1 + 2 to equal 3", () => { expect(sum(1, 2)).toBe(3); });',
      docsUrl: '/technologies/jest'
    },
    {
      name: 'Cypress',
      icon: Cloud,
      color: 'text-green-600',
      command: 'npm install cypress',
      description: 'Popular end-to-end testing framework for web applications',
      purpose: 'Testing',
      codeExample: 'const cypress = require("cypress");\ncypress.run({ spec: "cypress/integration/my_spec.js" });',
      docsUrl: '/technologies/cypress'
    },
    {
      name: 'Docker',
      icon: Box,
      color: 'text-blue-700',
      command: 'docker run -it ubuntu bash',
      description: 'Popular containerization platform for packaging and deploying applications',
      purpose: 'Containerization',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Docker Compose',
      icon: Layers,
      color: 'text-blue-800',
      command: 'docker-compose up',
      description: 'Popular tool for defining and running multi-container Docker applications',
      purpose: 'Containerization',
      codeExample: 'docker-compose up',
      docsUrl: '/technologies/docker-compose'
    },
    {
      name: 'NPM Studio',
      icon: Package,
      color: 'text-red-600',
      command: 'npm install npm-studio',
      description: 'Popular tool for managing and optimizing npm dependencies',
      purpose: 'Dependency Management',
      codeExample: 'const studio = require("npm-studio");\nstudio.optimizeDependencies();',
      docsUrl: '/technologies/npm-studio'
    },
    {
      name: 'n8n',
      icon: Workflow,
      color: 'text-green-700',
      command: 'npm install n8n',
      description: 'Popular workflow automation tool for integrating APIs and services',
      purpose: 'Automation',
      codeExample: 'const n8n = require("n8n");\nconst workflow = new n8n.Workflow();\nworkflow.addNode(new n8n.Node({ type: "http", method: "GET", url: "https://api.example.com" }));',
      docsUrl: '/technologies/n8n'
    },
    {
      name: 'Terminal',
      icon: Terminal,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Command',
      icon: Command,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Globe',
      icon: Globe,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Bug',
      icon: Bug,
      color: 'text-red-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'CheckSquare',
      icon: CheckSquare,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Layout',
      icon: Layout,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Clock',
      icon: Clock,
      color: 'text-yellow-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Loader',
      icon: Loader,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Bird',
      icon: Bird,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Eye',
      icon: Eye,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'FileJson',
      icon: FileJson,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Tags',
      icon: Tags,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'FileCode',
      icon: FileCode,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'FileType',
      icon: FileType,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Folder',
      icon: Folder,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Key',
      icon: Key,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Store',
      icon: Store,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Send',
      icon: Send,
      color: 'text-red-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'AlertCircle',
      icon: AlertCircle,
      color: 'text-yellow-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'HelpCircle',
      icon: HelpCircle,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'CircleDot',
      icon: CircleDot,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Smile',
      icon: Smile,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Trash2',
      icon: Trash2,
      color: 'text-red-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'RefreshCw',
      icon: RefreshCw,
      color: 'text-yellow-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'SendHorizontal',
      icon: SendHorizontal,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'CheckCircle',
      icon: CheckCircle,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'MessageSquare',
      icon: MessageSquare,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Underline',
      icon: Underline,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Router',
      icon: Router,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'File',
      icon: File,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Wrench',
      icon: Wrench,
      color: 'text-blue-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Radio',
      icon: Radio,
      color: 'text-green-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Zap',
      icon: Zap,
      color: 'text-red-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    },
    {
      name: 'Palette',
      icon: Palette,
      color: 'text-purple-400',
      command: 'docker run -it ubuntu bash',
      description: 'Command-line interface for interacting with Docker containers',
      purpose: 'Container Management',
      codeExample: 'docker run -it ubuntu bash',
      docsUrl: '/technologies/docker'
    }
  ];

  return (
    <div 
      className="backdrop-blur-md bg-white/20 text-white p-2 rounded-lg shadow-lg border border-white/20"
      style={{ 
        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1), 0 2px 6px rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center overflow-y-auto"
        style={{
          maxHeight: 'calc(100vh - 200px)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
        onMouseEnter={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(true)}
      >
        {technologies.map((tech) => (
          <button 
            key={tech.name} 
            onClick={() => setSelectedTech(tech)} 
            className="hover:bg-gray-200/20 p-2 rounded flex flex-col items-center transition-all duration-300 w-full"
          >
            <tech.icon className={`${tech.color} w-8 h-8`} />
            <span className="text-xs mt-1 text-white font-medium transition-opacity opacity-100">
              {tech.name}
            </span>
          </button>
        ))}
      </div>
      {selectedTech && (
        <Modal 
          isOpen={true}
          onClose={() => setSelectedTech(null)}
          icon={<selectedTech.icon className="w-10 h-10" />}
          title={selectedTech.name}
          description={selectedTech.description}
          instructions={[selectedTech.command, ...selectedTech.codeExample.split('\n')]}
          learnMoreLink={selectedTech.docsUrl}
        />
      )}
    </div>
  );
};

export default FloatingToolbarGrid;
