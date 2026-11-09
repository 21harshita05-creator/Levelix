
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./FrontendCourse.css";

/* =========================================================
   CONTEXT API
========================================================= */

const UserContext = createContext();

function UserProvider({ children }) {
  const learner = {
    name: "Harshita",
    level: 8,
    streak: 7,
  };

  return (
    <UserContext.Provider value={learner}>
      {children}
    </UserContext.Provider>
  );
}

function useLearner() {
  return useContext(UserContext);
}

/* =========================================================
   COURSE MODULES
========================================================= */

const modules = [
  {
    id: 1,
    title: "HTML Fundamentals",
    icon: "🌐",
    description: "Build the structure of web pages.",
    lessons: [
      "HTML Structure",
      "Semantic HTML",
      "Links & Images",
      "Forms & Inputs",
    ],
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    icon: "🎨",
    description: "Style web pages with CSS.",
    lessons: [
      "CSS Selectors",
      "Box Model",
      "Flexbox",
      "CSS Grid",
    ],
  },
  {
    id: 3,
    title: "JavaScript Basics",
    icon: "⚡",
    description: "Learn programming fundamentals.",
    lessons: [
      "Variables & Data Types",
      "Functions",
      "Arrays & Objects",
      "Loops & Conditions",
    ],
  },
  {
    id: 4,
    title: "DOM & Events",
    icon: "🖱️",
    description: "Make web pages interactive.",
    lessons: [
      "DOM Selection",
      "DOM Manipulation",
      "Events",
      "Event Listeners",
    ],
  },
  {
    id: 5,
    title: "Responsive Design",
    icon: "📱",
    description: "Create layouts for different screens.",
    lessons: [
      "Media Queries",
      "Mobile First",
      "Responsive Layouts",
      "Responsive Images",
    ],
  },
  {
    id: 6,
    title: "React Fundamentals",
    icon: "⚛️",
    description: "Build interfaces with React.",
    lessons: [
      "Components",
      "Props",
      "State",
      "Hooks",
    ],
  },
  {
    id: 7,
    title: "Advanced React",
    icon: "🚀",
    description: "Learn effects, forms and reusable UI.",
    lessons: [
      "useEffect",
      "Forms in React",
      "API Integration",
      "Reusable Components",
    ],
  },
  {
    id: 8,
    title: "Frontend Project",
    icon: "🏗️",
    description: "Apply your knowledge in a project.",
    lessons: [
      "Plan the Project",
      "Build the UI",
      "Add Functionality",
      "Deploy the Project",
    ],
  },
];

/* =========================================================
   LESSON THEORY
========================================================= */

const lessonTheory = {
  "HTML Structure": {
    introduction:
      "HTML stands for HyperText Markup Language. It defines the structure and content of a web page using elements represented by tags.",
    concepts: [
      "DOCTYPE declares the HTML document type.",
      "The html element contains the complete document.",
      "The head contains metadata and the page title.",
      "The body contains the visible page content.",
      "Most HTML elements use an opening tag and a closing tag.",
    ],
    example: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to Levelix</h1>
    <p>Learn frontend development.</p>
  </body>
</html>`,
    task: "Create a page with a heading, a paragraph and a page title.",
  },

  "Semantic HTML": {
    introduction:
      "Semantic HTML uses elements that describe the meaning and purpose of their content. It improves accessibility, readability and page structure.",
    concepts: [
      "header represents introductory content.",
      "nav contains navigation links.",
      "main contains the main content.",
      "section groups related content.",
      "article represents independent content.",
      "footer contains closing or supplementary information.",
    ],
    example: `<header>
  <h1>Levelix</h1>
</header>

<nav>
  <a href="#courses">Courses</a>
</nav>

<main>
  <section id="courses">
    <h2>Frontend Development</h2>
    <p>Learn HTML, CSS and JavaScript.</p>
  </section>
</main>

<footer>Keep learning!</footer>`,
    task: "Create a webpage using header, nav, main, section and footer.",
  },

  "Links & Images": {
    introduction:
      "Links connect one page to another, while images display visual content. The anchor element creates links and the img element displays images.",
    concepts: [
      "The href attribute specifies a link destination.",
      "The target attribute can open a link in a new tab.",
      "The src attribute specifies an image source.",
      "The alt attribute describes an image for accessibility.",
      "Use meaningful link text and image descriptions.",
    ],
    example: `<a href="https://example.com">
  Visit Example
</a>

<img
  src="/images/course.jpg"
  alt="Frontend development course"
/>`,
    task: "Add a link to a learning website and an image with descriptive alt text.",
  },

  "Forms & Inputs": {
    introduction:
      "HTML forms collect information from users. Input elements support text, email, password, numbers, checkboxes and other kinds of data.",
    concepts: [
      "form groups related form controls.",
      "label describes an input field.",
      "name identifies the field when form data is submitted.",
      "required enables basic browser validation.",
      "button with type submit submits the form.",
    ],
    example: `<form>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    required
  />

  <button type="submit">Submit</button>
</form>`,
    task: "Build a registration form with name, email and password fields.",
  },

  "CSS Selectors": {
    introduction:
      "CSS selectors identify the HTML elements that should receive styling. Selectors can target elements, classes, IDs and elements based on their relationships.",
    concepts: [
      "Element selector: p",
      "Class selector: .card",
      "ID selector: #header",
      "Descendant selector: .card p",
      "Pseudo-class selector: button:hover",
      "Specificity helps determine which CSS rule takes priority.",
    ],
    example: `body {
  font-family: Arial, sans-serif;
}

.card {
  padding: 20px;
  border-radius: 12px;
}

#main-title {
  color: purple;
}

button:hover {
  opacity: 0.8;
}`,
    task: "Style a card using element, class and hover selectors.",
  },

  "Box Model": {
    introduction:
      "The CSS box model explains how an element's content, padding, border and margin determine its size and spacing.",
    concepts: [
      "Content holds text, images or other elements.",
      "Padding adds space inside the border.",
      "Border surrounds the padding and content.",
      "Margin creates space outside the border.",
      "box-sizing: border-box includes padding and border in the declared dimensions.",
    ],
    example: `.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #95616F;
  margin: 16px;
  box-sizing: border-box;
}`,
    task: "Create two cards with different padding, borders and margins.",
  },

  Flexbox: {
    introduction:
      "Flexbox is a one-dimensional CSS layout system. It arranges items in a row or column and helps align and distribute available space.",
    concepts: [
      "display: flex activates Flexbox.",
      "justify-content aligns items along the main axis.",
      "align-items aligns items along the cross axis.",
      "flex-direction controls row or column direction.",
      "gap adds space between items.",
      "flex-wrap allows items to move onto another line.",
    ],
    example: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}`,
    task: "Arrange three cards in a centered row that wraps on smaller screens.",
  },

  "CSS Grid": {
    introduction:
      "CSS Grid is a two-dimensional layout system that controls rows and columns. It is useful for dashboards, galleries and page layouts.",
    concepts: [
      "display: grid creates a grid container.",
      "grid-template-columns defines column sizes.",
      "grid-template-rows defines row sizes.",
      "gap controls spacing between grid items.",
      "fr represents a fraction of available space.",
      "repeat() helps define repeated tracks.",
    ],
    example: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
    task: "Create a responsive grid of six learning cards.",
  },

  "Variables & Data Types": {
    introduction:
      "JavaScript variables store values. The const keyword declares a binding that cannot be reassigned, while let allows reassignment.",
    concepts: [
      "String stores text.",
      "Number stores numeric values.",
      "Boolean stores true or false.",
      "Array stores an ordered collection.",
      "Object stores properties and values.",
      "null represents an intentional absence of a value.",
      "Use let and const instead of var in modern code.",
    ],
    example: `const learnerName = "Harshita";
let xp = 100;
const isLearning = true;

xp = xp + 10;

console.log(learnerName);
console.log(xp);`,
    task: "Create variables for your name, learning goal and current XP.",
  },

  Functions: {
    introduction:
      "Functions are reusable blocks of code that perform a task. They can receive parameters and return results.",
    concepts: [
      "Parameters receive input values.",
      "Arguments are the actual values passed to a function.",
      "return sends a result back to the caller.",
      "Arrow functions provide a concise syntax.",
      "Functions reduce repeated code and improve organization.",
    ],
    example: `function addXP(currentXP, points) {
  return currentXP + points;
}

const totalXP = addXP(100, 20);

console.log(totalXP);`,
    task: "Write a function that calculates the total cost of two products.",
  },

  "Arrays & Objects": {
    introduction:
      "Arrays store ordered collections of values. Objects store related information as key-value pairs.",
    concepts: [
      "Array indexes start at zero.",
      "length gives the number of array elements.",
      "push() adds an item to an array.",
      "Objects use properties to represent information.",
      "Dot notation accesses an object's property.",
      "map() creates a new array by transforming elements.",
    ],
    example: `const skills = ["HTML", "CSS", "JavaScript"];

skills.push("React");

const learner = {
  name: "Harshita",
  level: 8
};

console.log(skills[0]);
console.log(learner.name);`,
    task: "Create an array of three skills and an object describing a learner.",
  },

  "Loops & Conditions": {
    introduction:
      "Conditions let programs make decisions. Loops repeat instructions while a condition is satisfied or for each item in a collection.",
    concepts: [
      "if runs code when a condition is true.",
      "else provides an alternative branch.",
      "else if checks another condition.",
      "for repeats code using a counter.",
      "while repeats while a condition remains true.",
      "break exits a loop early.",
    ],
    example: `const score = 75;

if (score >= 80) {
  console.log("Excellent");
} else if (score >= 50) {
  console.log("Passed");
} else {
  console.log("Try again");
}

for (let i = 1; i <= 3; i++) {
  console.log(i);
}`,
    task: "Print the numbers from 1 to 10 and classify a score as pass or fail.",
  },

  "DOM Selection": {
    introduction:
      "The Document Object Model represents an HTML page as a tree of objects. JavaScript can select elements in this tree to read or update them.",
    concepts: [
      "getElementById() selects an element by its ID.",
      "querySelector() selects the first matching CSS selector.",
      "querySelectorAll() selects all matching elements.",
      "textContent reads or changes text.",
      "Always ensure the target element exists before using it.",
    ],
    example: `const heading = document.querySelector("h1");

if (heading) {
  console.log(heading.textContent);
}`,
    task: "Select a heading and print its text in the console.",
  },

  "DOM Manipulation": {
    introduction:
      "DOM manipulation allows JavaScript to update page text, styles, attributes and elements after the page loads.",
    concepts: [
      "textContent changes text.",
      "classList.add() adds a CSS class.",
      "classList.remove() removes a CSS class.",
      "classList.toggle() adds or removes a class.",
      "createElement() creates a new element.",
      "appendChild() adds an element to another element.",
    ],
    example: `const message = document.querySelector("#message");

if (message) {
  message.textContent = "Welcome to Levelix!";
  message.classList.add("highlight");
}`,
    task: "Add a button that changes a paragraph's text when clicked.",
  },

  Events: {
    introduction:
      "Events represent actions such as clicks, keyboard input, form submission and mouse movement. JavaScript can respond to these actions.",
    concepts: [
      "click occurs when an element is clicked.",
      "input occurs when an input value changes.",
      "submit occurs when a form is submitted.",
      "keydown occurs when a keyboard key is pressed.",
      "Event objects provide information about the event.",
    ],
    example: `const button = document.querySelector("button");

if (button) {
  button.onclick = function () {
    console.log("Button clicked");
  };
}`,
    task: "Create a button that displays a message when clicked.",
  },

  "Event Listeners": {
    introduction:
      "addEventListener() attaches a function to an event. It is generally preferred because it allows multiple listeners and supports event options.",
    concepts: [
      "The first argument is the event name.",
      "The second argument is the callback function.",
      "The event object describes the event.",
      "preventDefault() prevents the browser's default action.",
      "removeEventListener() removes a registered listener when needed.",
    ],
    example: `const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", () => {
    alert("You earned 10 XP!");
  });
}`,
    task: "Use addEventListener() to update a counter when a button is clicked.",
  },

  "Media Queries": {
    introduction:
      "Media queries apply CSS rules only when conditions such as viewport width are satisfied. They are a key part of responsive design.",
    concepts: [
      "Use @media to define conditional styles.",
      "max-width targets a viewport up to a specified width.",
      "min-width targets a viewport at or above a specified width.",
      "Keep breakpoints based on when your content needs them.",
      "Test layouts at multiple screen sizes.",
    ],
    example: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards {
    grid-template-columns: 1fr;
  }
}`,
    task: "Make a three-column card layout become one column on mobile.",
  },

  "Mobile First": {
    introduction:
      "Mobile-first design begins with a layout for smaller screens and adds enhancements for larger screens. It helps prioritize essential content.",
    concepts: [
      "Write the base CSS for mobile screens.",
      "Use min-width media queries for larger screens.",
      "Keep navigation and buttons easy to use on touch screens.",
      "Avoid unnecessary horizontal scrolling.",
      "Test real content rather than only empty layouts.",
    ],
    example: `.page {
  padding: 16px;
}

@media (min-width: 768px) {
  .page {
    padding: 32px;
  }
}`,
    task: "Build a page with mobile spacing and larger desktop spacing.",
  },

  "Responsive Layouts": {
    introduction:
      "Responsive layouts adapt to different screen sizes using flexible widths, CSS Grid, Flexbox and media queries.",
    concepts: [
      "Use percentages or flexible grid units where appropriate.",
      "Use max-width to prevent content from becoming too wide.",
      "Use minmax() to set flexible grid track limits.",
      "Use flex-wrap for flexible rows.",
      "Check text, images and navigation on narrow screens.",
    ],
    example: `.layout {
  width: min(100% - 32px, 1100px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  );
  gap: 20px;
}`,
    task: "Create a card layout that adjusts the number of columns automatically.",
  },

  "Responsive Images": {
    introduction:
      "Responsive images scale to fit their containers and avoid overflowing the page. Different image sources can also be supplied for different display needs.",
    concepts: [
      "max-width: 100% prevents images from exceeding their container.",
      "height: auto preserves the image's aspect ratio.",
      "object-fit controls how an image fills its box.",
      "The picture element can provide alternative image sources.",
      "Use descriptive alt text for meaningful images.",
    ],
    example: `.course-image {
  display: block;
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
}`,
    task: "Add an image to a card and make it resize with the card.",
  },

  Components: {
    introduction:
      "React components are reusable pieces of UI. A component can contain JSX, JavaScript logic and other components.",
    concepts: [
      "Component names start with a capital letter.",
      "Components return JSX.",
      "Components can be composed together.",
      "Each component should have a clear responsibility.",
      "Export components when they need to be used in other files.",
    ],
    example: `function Welcome() {
  return (
    <section>
      <h2>Welcome to Levelix</h2>
      <p>Start learning today.</p>
    </section>
  );
}

export default Welcome;`,
    task: "Create a reusable CourseCard component with a title and description.",
  },

  Props: {
    introduction:
      "Props allow parent components to pass data to child components. They make components reusable with different content.",
    concepts: [
      "Props are passed as attributes in JSX.",
      "A component receives props as an object.",
      "Destructure props to access individual values.",
      "Props should be treated as read-only.",
      "Use default values when appropriate.",
    ],
    example: `function CourseCard({ title, duration }) {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>{duration}</p>
    </div>
  );
}

// Usage:
<CourseCard
  title="React Fundamentals"
  duration="4 hours"
/>`,
    task: "Pass a course name and duration into a reusable component.",
  },

  State: {
    introduction:
      "State stores data that can change over time. When state changes, React re-renders the component to display the updated result.",
    concepts: [
      "useState is a React Hook.",
      "The Hook returns the current value and a setter function.",
      "Call the setter to request an update.",
      "Do not modify state directly.",
      "State updates may be processed asynchronously.",
    ],
    example: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    task: "Build a counter with buttons to increase and decrease the value.",
  },

  Hooks: {
    introduction:
      "React Hooks let function components use React features such as state, effects and context. Hooks must be called at the top level of React components or custom Hooks.",
    concepts: [
      "useState stores changing data.",
      "useEffect synchronizes with external systems.",
      "useContext reads a context value.",
      "Custom Hooks share reusable stateful logic.",
      "Do not call Hooks inside loops or conditional blocks.",
    ],
    example: `import { useState } from "react";

function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}`,
    task: "Build a toggle that shows and hides a paragraph.",
  },

  useEffect: {
    introduction:
      "useEffect runs side-effect logic after React renders. It is commonly used to synchronize with external systems, subscriptions or browser APIs.",
    concepts: [
      "An empty dependency array runs the effect after the initial mount.",
      "Dependencies control when the effect runs again.",
      "A cleanup function can remove subscriptions or listeners.",
      "Avoid unnecessary effects for values that can be calculated during rendering.",
      "Effects run only on the client.",
    ],
    example: `import { useEffect, useState } from "react";

function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Count: " + count;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    task: "Use useEffect to update the document title when a counter changes.",
  },

  "Forms in React": {
    introduction:
      "React forms often use controlled inputs, where input values are stored in state. This allows validation, feedback and submission handling.",
    concepts: [
      "value connects an input to state.",
      "onChange updates the state.",
      "onSubmit handles form submission.",
      "preventDefault() prevents a page reload.",
      "Validate required fields before processing data.",
    ],
    example: `import { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Form submitted successfully!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
        required
      />

      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}`,
    task: "Create a controlled form with an email field and submission feedback.",
  },

  "API Integration": {
    introduction:
      "Frontend applications can request data from APIs. Fetching data involves handling loading states, successful responses and errors.",
    concepts: [
      "fetch() sends a network request.",
      "response.json() parses JSON response data.",
      "Check response.ok for HTTP errors.",
      "Use loading state while a request is in progress.",
      "Handle failures with try/catch.",
      "Avoid making requests repeatedly without a reason.",
    ],
    example: `async function loadData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Unable to load data:", error);
  }
}`,
    task: "Fetch a sample post and display its title on a webpage.",
  },

  "Reusable Components": {
    introduction:
      "Reusable components reduce duplicated UI code and keep an application consistent. Good components accept props and focus on a clear responsibility.",
    concepts: [
      "Extract repeated UI into a component.",
      "Use props for configurable content.",
      "Use composition to combine smaller components.",
      "Keep data and presentation organized.",
      "Use stable keys when rendering lists.",
    ],
    example: `function SkillCard({ skill, level }) {
  return (
    <article className="skill-card">
      <h3>{skill}</h3>
      <p>Level: {level}</p>
    </article>
  );
}

function SkillList() {
  return (
    <div>
      <SkillCard skill="HTML" level="Beginner" />
      <SkillCard skill="React" level="Intermediate" />
    </div>
  );
}`,
    task: "Create a reusable lesson card and use it for three different lessons.",
  },

  "Plan the Project": {
    introduction:
      "Planning defines a project's goal, audience, features and layout before implementation. It helps keep development organized.",
    concepts: [
      "Define the problem the application solves.",
      "Identify the target users.",
      "List essential features before optional features.",
      "Sketch the main pages and user flows.",
      "Choose a manageable project scope.",
    ],
    example: `Project: Learning Dashboard

Main features:
1. Display learning paths
2. Show course progress
3. Open lesson content
4. Complete quizzes
5. Award XP

Pages:
- Dashboard
- Course
- Practice`,
    task: "Write a short plan for a learning dashboard with at least four features.",
  },

  "Build the UI": {
    introduction:
      "The user interface is the visible part of an application. Build it from reusable components and apply consistent spacing, typography and colors.",
    concepts: [
      "Start with the main page structure.",
      "Break the page into reusable components.",
      "Use semantic HTML where appropriate.",
      "Apply consistent design tokens.",
      "Check accessibility and responsive behavior.",
    ],
    example: `function Dashboard() {
  return (
    <main className="dashboard">
      <h1>My Learning</h1>

      <section className="course-list">
        <article className="course-card">
          <h2>Frontend Development</h2>
          <p>Continue your learning journey.</p>
        </article>
      </section>
    </main>
  );
}`,
    task: "Build a dashboard with a heading and three course cards.",
  },

  "Add Functionality": {
    introduction:
      "Functionality makes the interface interactive. Connect buttons, forms, navigation and progress indicators to application state.",
    concepts: [
      "Use event handlers for user actions.",
      "Use state for interactive UI.",
      "Use React Router for page navigation.",
      "Validate form input.",
      "Keep shared application state in the existing state architecture.",
    ],
    example: `function CompleteLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <button onClick={() => setCompleted(true)}>
      {completed ? "Lesson Completed ✓" : "Complete Lesson"}
    </button>
  );
}`,
    task: "Add a button that marks a lesson as completed and updates the displayed status.",
  },

  "Deploy the Project": {
    introduction:
      "Deployment makes a web application available online. Before deploying, test the app, check its production build and configure the hosting platform.",
    concepts: [
      "Run the production build command.",
      "Fix build errors and console warnings.",
      "Configure environment variables where needed.",
      "Check routes and assets after deployment.",
      "Use version control to manage project changes.",
    ],
    example: `# Install project dependencies
npm install

# Run the development server
npm run dev

# Create a production build
npm run build`,
    task: "Create a production build and check that it completes without errors.",
  },
};

/* =========================================================
   QUIZZES
========================================================= */

const quizQuestions = {
  1: [
    {
      question: "What does HTML define?",
      options: ["Page structure", "Database queries", "Server memory", "Network speed"],
      answer: 0,
    },
    {
      question: "Which element represents the main page content?",
      options: ["footer", "main", "title", "style"],
      answer: 1,
    },
  ],
  2: [
    {
      question: "Which property activates Flexbox?",
      options: ["position", "float", "display: flex", "text-align"],
      answer: 2,
    },
    {
      question: "What does padding control?",
      options: ["Space inside the border", "Text content", "Browser history", "Font family"],
      answer: 0,
    },
  ],
  3: [
    {
      question: "Which keyword declares a block-scoped variable that can be reassigned?",
      options: ["const", "let", "static", "define"],
      answer: 1,
    },
    {
      question: "What does a function's return statement do?",
      options: ["Repeats a loop", "Creates a CSS rule", "Returns a result", "Reloads the page"],
      answer: 2,
    },
  ],
  4: [
    {
      question: "Which method selects the first matching CSS selector?",
      options: ["querySelector()", "getAll()", "selectFirst()", "findHTML()"],
      answer: 0,
    },
    {
      question: "Which method attaches an event handler?",
      options: ["addEventListener()", "createEventPage()", "appendStyle()", "setSelector()"],
      answer: 0,
    },
  ],
  5: [
    {
      question: "Which CSS feature applies styles at specific viewport sizes?",
      options: ["Media queries", "HTML forms", "JavaScript arrays", "React props"],
      answer: 0,
    },
    {
      question: "What does max-width: 100% help prevent?",
      options: ["Image overflow", "Form submission", "React rendering", "Variable creation"],
      answer: 0,
    },
  ],
  6: [
    {
      question: "What is a React component?",
      options: ["A reusable UI building block", "A database table", "A CSS selector", "A browser"],
      answer: 0,
    },
    {
      question: "Which Hook stores component state?",
      options: ["useEffect", "useState", "useRoute", "useHTML"],
      answer: 1,
    },
  ],
  7: [
    {
      question: "What is useEffect commonly used for?",
      options: ["Synchronizing with external systems", "Writing CSS selectors", "Creating HTML tags", "Defining routes only"],
      answer: 0,
    },
    {
      question: "Which event is commonly used to handle form submission?",
      options: ["onHover", "onSubmit", "onStyle", "onLoadCSS"],
      answer: 1,
    },
  ],
  8: [
    {
      question: "Why plan a project before coding?",
      options: ["To define goals and features", "To remove all testing", "To avoid components", "To disable navigation"],
      answer: 0,
    },
    {
      question: "Which command creates a Vite production build?",
      options: ["npm run build", "npm remove build", "npm run delete", "npm run clean-all"],
      answer: 0,
    },
  ],
};

/* =========================================================
   COURSE NAVBAR
   Logo left | Course title center | Back right
========================================================= */

function CourseNavbar({ progress, onBack }) {
  const learner = useLearner();
  const xp = useSelector((state) => state.learning?.xp ?? 0);
  const navigate = useNavigate();

  return (
    <nav className="course-navbar">
      <button
        type="button"
        className="course-logo"
        onClick={() => navigate("/dashboard")}
        aria-label="Go to Levelix dashboard"
      >
        <img src="/logo.png" alt="" />
        <span>Levelix</span>
      </button>

      <div className="course-navbar-center">
        <h1 className="course-navbar-title">Frontend Course</h1>

        <div
          className="course-progress-nav"
          aria-label={`Course progress ${progress}%`}
        >
          <div className="course-progress-nav-bar">
            <div
              className="course-progress-nav-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="course-navbar-right">
        <div className="course-learner-info">
          <span>👤 {learner?.name || "Learner"}</span>
          <span>⚡ {xp} XP</span>
        </div>

        <button
          type="button"
          className="course-back-button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
      </div>
    </nav>
  );
}

/* =========================================================
   LESSON SIDEBAR
========================================================= */

function CourseSidebar({
  activeModule,
  activeLesson,
  completedLessons,
  onSelectModule,
  onSelectLesson,
}) {
  return (
    <aside className="course-sidebar">
      <h2>Frontend Roadmap</h2>
      <p className="sidebar-subtitle">All modules are available</p>

      {modules.map((module) => (
        <div className="sidebar-module" key={module.id}>
          <button
            type="button"
            className={`sidebar-module-button ${
              activeModule === module.id ? "active" : ""
            }`}
            onClick={() => onSelectModule(module.id)}
          >
            <span>{module.icon}</span>
            <span>{module.title}</span>
            <span aria-hidden="true">⌄</span>
          </button>

          {activeModule === module.id && (
            <div className="sidebar-lessons">
              {module.lessons.map((lesson, index) => {
                const lessonId = `${module.id}-${index}`;
                const completed = completedLessons.includes(lessonId);

                return (
                  <button
                    type="button"
                    key={lessonId}
                    className={`sidebar-lesson ${
                      activeLesson === index ? "active" : ""
                    }`}
                    onClick={() => onSelectLesson(index)}
                  >
                    <span>{completed ? "✓" : "○"}</span>
                    <span>{lesson}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

/* =========================================================
   LESSON THEORY
========================================================= */

function LessonContent({
  lesson,
  moduleId,
  lessonIndex,
  isCompleted,
  onComplete,
}) {
  const theory = lessonTheory[lesson];

  return (
    <article className="lesson-content">
      <div className="lesson-heading">
        <span className="lesson-label">
          MODULE {moduleId} · LESSON {lessonIndex + 1}
        </span>

        <h1>{lesson}</h1>
      </div>

      <section className="lesson-theory">
        <h2>📘 Introduction</h2>
        <p>{theory?.introduction || "Lesson content coming soon."}</p>
      </section>

      <section className="lesson-theory">
        <h2>💡 Important Concepts</h2>

        <ul>
          {(theory?.concepts || []).map((concept, index) => (
            <li key={index}>{concept}</li>
          ))}
        </ul>
      </section>

      <section className="lesson-theory">
        <h2>💻 Code Example</h2>

        <pre className="lesson-code">
          <code>{theory?.example || "// Example coming soon."}</code>
        </pre>
      </section>

      <section className="lesson-practice-task">
        <h2>✍️ Practice Task</h2>
        <p>{theory?.task || "Review the lesson concepts."}</p>
      </section>

      <button
        type="button"
        className="complete-lesson-button"
        onClick={onComplete}
        disabled={isCompleted}
      >
        {isCompleted ? "Lesson Completed ✓" : "Mark Lesson as Completed ✓"}
      </button>
    </article>
  );
}

/* =========================================================
   COURSE QUIZ
========================================================= */

function CourseQuiz({ moduleId, isCompleted, onQuizComplete }) {
  const questions = quizQuestions[moduleId] || [];
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setFeedback("");
    setSubmitted(false);
  }, [moduleId]);

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      setFeedback("Please answer every question before submitting.");
      return;
    }

    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score++;
      }
    });

    setSubmitted(true);

    setFeedback(
      `You scored ${score} out of ${questions.length}. ${
        score === questions.length
          ? "Excellent work! 🎉"
          : "Review the lesson and try again."
      }`
    );

    if (score === questions.length) {
      onQuizComplete();
    }
  }

  return (
    <section className="course-quiz">
      <h2>🧠 Knowledge Check</h2>
      <p>Answer the questions to test your understanding.</p>

      {isCompleted && (
        <p className="quiz-feedback submitted">
          Quiz completed successfully ✓
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <fieldset className="quiz-question" key={questionIndex}>
            <legend>
              {questionIndex + 1}. {question.question}
            </legend>

            {question.options.map((option, optionIndex) => (
              <label className="quiz-option" key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${moduleId}-${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  disabled={submitted || isCompleted}
                  onChange={() => {
                    setAnswers((previous) => ({
                      ...previous,
                      [questionIndex]: optionIndex,
                    }));
                    setFeedback("");
                  }}
                />

                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        ))}

        <button
          type="submit"
          className="quiz-submit-button"
          disabled={submitted || isCompleted}
        >
          Submit Answers
        </button>

        {feedback && (
          <p
            className={`quiz-feedback ${
              submitted ? "submitted" : "error"
            }`}
            role="status"
          >
            {feedback}
          </p>
        )}

        {submitted && !isCompleted && (
          <button
            type="button"
            className="quiz-retry-button"
            onClick={() => {
              setAnswers({});
              setFeedback("");
              setSubmitted(false);
            }}
          >
            Try Again
          </button>
        )}
      </form>
    </section>
  );
}

/* =========================================================
   PRACTICE CARD
========================================================= */

function PracticeCard({ module, onPractice }) {
  return (
    <section className="course-practice-card">
      <div>
        <span className="practice-icon">🎯</span>
        <h2>Ready to Practice?</h2>
        <p>
          Apply what you learned in {module.title} with practical
          exercises and coding challenges.
        </p>
      </div>

      <button type="button" onClick={onPractice}>
        Start Practice →
      </button>
    </section>
  );
}

/* =========================================================
   COURSE CONTENT
========================================================= */

function FrontendCourseContent({ onBack, onPractice }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxXP = useSelector(
    (state) => state.learning?.xp ?? 0
  );

  const [activeModule, setActiveModule] = useState(3);
  const [activeLesson, setActiveLesson] = useState(0);

  const [completedLessons, setCompletedLessons] = useState([
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "2-0",
    "2-1",
    "2-2",
    "2-3",
  ]);

  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const currentModule = modules.find(
    (module) => module.id === activeModule
  );

  const currentLesson = currentModule?.lessons[activeLesson];

  const totalLessons = modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const progress = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  const currentLessonId = `${activeModule}-${activeLesson}`;
  const isCurrentLessonCompleted =
    completedLessons.includes(currentLessonId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function selectModule(moduleId) {
    setActiveModule(moduleId);
    setActiveLesson(0);
    window.scrollTo(0, 0);
  }

  function selectLesson(lessonIndex) {
    setActiveLesson(lessonIndex);
    window.scrollTo(0, 0);
  }

  function completeLesson() {
    const lessonId = `${activeModule}-${activeLesson}`;

    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((previous) => [...previous, lessonId]);

      dispatch({
        type: "learning/addXP",
        payload: 10,
      });
    }
  }

  function completeQuiz() {
    if (!completedQuizzes.includes(activeModule)) {
      setCompletedQuizzes((previous) => [...previous, activeModule]);

      dispatch({
        type: "learning/addXP",
        payload: 5,
      });
    }
  }

  function goBack() {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }

  function goToPractice() {
    if (onPractice) {
      onPractice();
    } else {
      navigate("/frontend/practice");
    }
  }

  function goToNextLesson() {
    if (!currentModule) return;

    if (activeLesson < currentModule.lessons.length - 1) {
      setActiveLesson((previous) => previous + 1);
    } else if (activeModule < modules.length) {
      setActiveModule((previous) => previous + 1);
      setActiveLesson(0);
    } else {
      return;
    }

    window.scrollTo(0, 0);
  }

  function goToPreviousLesson() {
    if (activeLesson > 0) {
      setActiveLesson((previous) => previous - 1);
    } else if (activeModule > 1) {
      const previousModule = modules.find(
        (module) => module.id === activeModule - 1
      );

      setActiveModule((previous) => previous - 1);
      setActiveLesson(previousModule.lessons.length - 1);
    }

    window.scrollTo(0, 0);
  }

  return (
    <div className="frontend-course-page">
      <CourseNavbar progress={progress} onBack={goBack} />

      <div className="course-layout">
        <CourseSidebar
          activeModule={activeModule}
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          onSelectModule={selectModule}
          onSelectLesson={selectLesson}
        />

        <main className="course-main-content">
          <div className="course-welcome">
            <div>
              <p className="course-eyebrow">YOUR LEARNING JOURNEY</p>
              <h1>Frontend Development</h1>
              <p>
                Learn concepts, study examples and practice one lesson
                at a time.
              </p>
            </div>

            <div className="course-xp-card">
              <span>⚡ Your XP</span>
              <strong>{reduxXP}</strong>
            </div>
          </div>

          <div className="course-summary-cards">
            <div className="course-summary-card">
              <span>📚</span>
              <p>Modules</p>
              <strong>{modules.length}</strong>
            </div>

            <div className="course-summary-card">
              <span>✅</span>
              <p>Completed Lessons</p>
              <strong>
                {completedLessons.length}/{totalLessons}
              </strong>
            </div>

            <div className="course-summary-card">
              <span>📈</span>
              <p>Course Progress</p>
              <strong>{progress}%</strong>
            </div>
          </div>

          {currentModule && currentLesson && (
            <>
              <div className="current-module-heading">
                <span>{currentModule.icon}</span>

                <div>
                  <p>MODULE {currentModule.id}</p>
                  <h2>{currentModule.title}</h2>
                  <p>{currentModule.description}</p>
                </div>
              </div>

              <LessonContent
                key={`${activeModule}-${activeLesson}`}
                lesson={currentLesson}
                moduleId={activeModule}
                lessonIndex={activeLesson}
                isCompleted={isCurrentLessonCompleted}
                onComplete={completeLesson}
              />

              <div className="lesson-navigation-buttons">
                <button
                  type="button"
                  disabled={activeModule === 1 && activeLesson === 0}
                  onClick={goToPreviousLesson}
                >
                  ← Previous Lesson
                </button>

                <button
                  type="button"
                  disabled={
                    activeModule === modules.length &&
                    activeLesson === currentModule.lessons.length - 1
                  }
                  onClick={goToNextLesson}
                >
                  Next Lesson →
                </button>
              </div>

              <CourseQuiz
                moduleId={activeModule}
                isCompleted={completedQuizzes.includes(activeModule)}
                onQuizComplete={completeQuiz}
              />

              <PracticeCard
                module={currentModule}
                onPractice={goToPractice}
              />
            </>
          )}

          <section className="course-module-overview">
            <h2>Explore All Modules</h2>
            <p>
              Select any module to study its lessons. There are no
              prerequisite locks.
            </p>

            <div className="course-module-grid">
              {modules.map((module) => (
                <button
                  type="button"
                  key={module.id}
                  className={`course-module-card ${
                    activeModule === module.id ? "active" : ""
                  }`}
                  onClick={() => selectModule(module.id)}
                >
                  <span>{module.icon}</span>
                  <h3>{module.title}</h3>
                  <p>{module.lessons.length} lessons</p>
                  <span className="module-card-action">
                    Open Module →
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="course-progress-section">
            <h2>Your Progress</h2>

            <div className="course-progress-track">
              <div
                className="course-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>
              You have completed {completedLessons.length} of{" "}
              {totalLessons} lessons ({progress}%).
            </p>

            <p>
              Quiz XP is awarded when you answer all questions correctly.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FrontendCourse({ onBack, onPractice }) {
  return (
    <UserProvider>
      <FrontendCourseContent
        onBack={onBack}
        onPractice={onPractice}
      />
    </UserProvider>
  );
}
