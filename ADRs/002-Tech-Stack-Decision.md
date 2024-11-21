---
status: Accepted
date: 4/11/2024
decision-makers: All
consulted: All
informed: All
---

# Using React and Node(with Express) technology stack for the Advanced Libary Management System

## Context and Problem Statement

To successfully deliver the proof of concept for the Advanced Library Management System, the team needs to select a suitable technology 
stack for both the front-end and the back-end. 
This stack must facilitate efficient front-end and back-end development, be scalable, and align with the team’s skills.

## Decision Drivers
* Scalability
* Performance
* Maintainability

## Considered Options
### Front End 
* React
* Angular
* Vue
### Back End
* PHP
* Node (with Express)
* ASP.net

## Decision Outcome

We chose React for the front-end and Node.js with Express for the back-end, as this combination provides the flexibility, scalability, 
and developer efficiency needed for the AML system. React’s component-based structure allows for modular, maintainable UI development, 
while Node.js and Express facilitate non-blocking event driven architecture, fast execution and scalability.

### Consequences
#### Pros
* This stack promotes fast development and has a rich ecosystem with extensive community support, making it easier to find resources and troubleshoot.
* Highly flexible, allowing fast front-end development and scalability with reusable components and back-end efficiency with fast execution.
* High performance reinforced by Virtual DOM - By virtualizing and keeping DOM in memory, React grants outstandingly fast rendering capacities with all view changes readily reflected in the virtual DOM. (Oleksandr Hutsulyak. 2024, August)
#### Cons
* The complexity of react may require additional learning, causing the team time and cost issues.
* Node is single-threaded, which may not be optimal for CPU-bound tasks if they emerge in future development.

### Confirmation
The decision to use react for the front-end and node with express for the back-end
has been confirmed by the team as the best choice given current resources, timeframe, and project requirements.


## Pros and Cons of the Options

### React + PHP
#### Pros
* PHP is widely supported and combined with React, it allows for reliable back-end development.
* Fast: PHP uses its memory, minimizing server workload and increasing performance. PHP can be up to 382% faster than Python and 195% faster than Ruby. (Singla, L. 2021, January 12)

#### Neutral 
* PHP executes requests in isolation to stop errors from spreading, but the processing slows down the system.
#### Cons
* PHP is a blocking language, making it less suited for I/O heavy applications like a library management systems
* PHP handle requests one at a time, which can strain CPU and RAM resources and lead to slower back-end processing times and limit scalability.


### Angular + ASP.NET
#### Pros
* Reuseability: In Angular components of similar nature are well encapsulated. Developers can reuse them across different parts of an application.
* Maintainability: Components that are easily decoupled from each other can be easily replaced with better implementations. Which means teams will be more efficient in maintaining and updating the code.
* Angular and ASP.NET both follow the Model-View-Controller (MVC) architecture, which allows for separate input, process and output of the application.

#### Cons
* ASP.NET’s licensing costs and higher hosting fees can make it a less budget-friendly choice compared to open-source Node.js solutions.
* Angular and ASP.NET have steeper learning curves, requiring more specialized knowledge.

### Vue + Node(with Express)
#### Pros
* Vue has a gentle learning curve making it ideal for developers new to frameworks, with strong component-based structure similar to React.
* Node.js is a non-blocking model, making it ideal for handling high I/O tasks and asynchronous processes, complementing Vue’s fast front end.
#### Cons 
* Vue’s ecosystem is less extensive than React’s, which can limit access to specialized libraries and tooling.
* Vue may require additional tooling for optimal performance in large-scale applications.
* Lack of support for large-scale projects - Vue’s community and development team size is still incomparable with more mature Angular or React. Neither does it enjoy financial support from large enterprises. To be adopted in large-scale projects, the technology should be stable and strongly supported, so that issues can be solved quickly. While Vue doesn’t have that many problems and there is even a demand coming from enterprises like IBM and Adobe, it is mostly used in relatively small projects. (The Pros and Cons of Vue.js. n.d.. AltexSoft.)

### Comparison
Both PHP and Vue are powerfull tools for web development but both have different purposes in different areas. PHP is a backend server-side language made to handle server logic, manage databases and generate dynamic HTML. It is more well suited for server side operatitons like content management systems. Vue.js on the other hand is a JavaScriptt framework which allows the teams to develop dynamic, responsive and a interactive user experience on the frontend.

In conclusion, PHP is better for handling server side tasks and database interactions while Vue shines in developing front end interfaces. Choosing between these two options mean we have to consider if our program is going to be more back end or front end.

### References
* Oleksandr Hutsulyak. (2024, August). Why Use React for Web Development: 10 Reasons To Apply. Blog | TechMagic . https://www.techmagic.co/blog/why-we-use-react-js-in-the-development
* Singla, L. (2021, January 12). What is PHP for Web Development and Why Should You Use It? Insights - Web and Mobile Development Services and Solutions. https://www.netsolutions.com/insights/what-is-php/
* The Pros and Cons of Vue.js. (n.d.). AltexSoft. https://www.altexsoft.com/blog/pros-and-cons-of-vue-js/

‌

‌

‌
