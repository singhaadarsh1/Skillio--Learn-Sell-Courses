const courseContent = {
  mern: {
    videoId: "7CqJlxBYj-M",
    lessons: [
      {
        title: "MERN Stack ",
        content:
          "Understand how MongoDB, Express, React, and Node.js work together.",
      },
      {
        title: "Backend with Node and Express",
        content:
          "Learn how REST APIs are created and how requests move through an Express backend.",
      },
      {
        title: "MongoDB and Data",
        content:
          "Understand how application data is stored and accessed using MongoDB and Mongoose.",
      },
      {
        title: "Connecting Frontend and Backend",
        content:
          "Understand how React sends requests to Express and receives data from the backend.",
      },
    ],
  },

  react: {
    videoId: "DLX62G4lc44",
    lessons: [
      {
        title: "React Fundamentals",
        content:
          "Understand components, JSX, and the basic structure of a React application.",
      },
      {
        title: "Props and Components",
        content:
          "Learn how data moves between components using props.",
      },
      {
        title: "State and Events",
        content:
          "Understand state, user interaction, and how React updates the UI.",
      },
      {
        title: "Building React Applications",
        content:
          "Put components, state, events, and APIs together to build useful applications.",
      },
    ],
  },

  dsa: {
    videoId: "RpLnQnurpLY",
    lessons: [
      {
        title: "Arrays and Linked Lists",
        content:
          "Understand linear data structures and when to use them.",
      },
      {
        title: "Stacks, Queues and Hashing",
        content:
          "Learn common data structures used to solve practical programming problems.",
      },
      {
        title: "Trees and Graphs",
        content:
          "Understand hierarchical and interconnected data structures.",
      },
      {
        title: "Searching and Algorithms",
        content:
          "Learn how common searching, sorting, recursion, and algorithmic techniques work.",
      },
    ],
  },

  python: {
    videoId: "rfscVS0vtbw",
    lessons: [
      {
        title: "Python Fundamentals",
        content:
          "Learn variables, data types, operators, and basic Python syntax.",
      },
      {
        title: "Conditions and Loops",
        content:
          "Understand if statements, comparison operators, while loops, and for loops.",
      },
      {
        title: "Functions and Data Structures",
        content:
          "Work with functions, lists, dictionaries, tuples, and other Python structures.",
      },
      {
        title: "Object-Oriented Python",
        content:
          "Understand classes, objects, methods, and basic object-oriented programming.",
      },
    ],
  },

  ai: {
    videoId: "pqNCD_5r0IU",
    lessons: [
      {
        title: "Machine Learning Basics",
        content:
          "Understand features, labels, training data, and the basic machine learning workflow.",
      },
      {
        title: "Supervised Learning",
        content:
          "Learn classification and regression concepts.",
      },
      {
        title: "Machine Learning Algorithms",
        content:
          "Explore algorithms such as KNN, SVM, linear regression, and clustering.",
      },
      {
        title: "Neural Networks",
        content:
          "Understand the basic idea behind neural networks and model training.",
      },
    ],
  },

  devops: {
    videoId: "4m9j6hlbf4g",
    lessons: [
      {
        title: "DevOps Fundamentals",
        content:
          "Understand development, operations, automation, and deployment.",
      },
      {
        title: "Docker",
        content:
          "Learn what containers are and how Docker packages applications.",
      },
      {
        title: "Networking and Infrastructure",
        content:
          "Understand the infrastructure concepts behind running applications.",
      },
      {
        title: "Deployment Fundamentals",
        content:
          "Learn the basic ideas behind deploying applications reliably.",
      },
    ],
  },

  cloud: {
    videoId: "4m9j6hlbf4g",
    lessons: [
      {
        title: "Cloud Computing Basics",
        content:
          "Understand what cloud computing is and why applications use cloud infrastructure.",
      },
      {
        title: "Servers and Compute",
        content:
          "Learn how applications run on cloud compute resources.",
      },
      {
        title: "Storage and Networking",
        content:
          "Understand cloud storage and basic networking concepts.",
      },
      {
        title: "Cloud Deployment",
        content:
          "Understand the basic process of deploying applications to the cloud.",
      },
    ],
  },

  javascript: {
    videoId: "PkZNo7MFNFg",
    lessons: [
      {
        title: "JavaScript Basics",
        content:
          "Learn variables, data types, operators, and basic syntax.",
      },
      {
        title: "Functions and Scope",
        content:
          "Understand functions, parameters, return values, and scope.",
      },
      {
        title: "Arrays and Objects",
        content:
          "Learn how to work with structured data using arrays and objects.",
      },
      {
        title: "Modern JavaScript",
        content:
          "Understand ES6 features such as arrow functions, destructuring, spread, and modules.",
      },
    ],
  },
};

function getCourseContent(title) {
  const name = title.toLowerCase();

  if (name.includes("mern")) {
    return courseContent.mern;
  }

  if (name.includes("react")) {
    return courseContent.react;
  }

  if (
    name.includes("data structure") ||
    name.includes("algorithm") ||
    name.includes("dsa")
  ) {
    return courseContent.dsa;
  }

  if (name.includes("python")) {
    return courseContent.python;
  }

  if (
    name.includes("artificial intelligence") ||
    name.includes("machine learning") ||
    name.includes("ai")
  ) {
    return courseContent.ai;
  }

  if (
    name.includes("docker") ||
    name.includes("kubernetes")
  ) {
    return courseContent.devops;
  }

  if (
    name.includes("aws") ||
    name.includes("cloud")
  ) {
    return courseContent.cloud;
  }

  if (name.includes("javascript")) {
    return courseContent.javascript;
  }

  return courseContent.javascript;
}
module.exports = {
  getCourseContent,
};