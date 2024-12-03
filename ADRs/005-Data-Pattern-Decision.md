---
status: Accepted
date: 10/10/2024
decision-makers: All
consulted: All
informed: All
---

# 3-Tier Architecture for the Library Management System

## Context and Problem Statement
In order to design a scalable, maintainable, and flexible system for managing library operations, we need to select an appropriate architectural style. 
The system should allow us to separate concerns between the presentation tier, application tier, and data storage tier, while supporting ease of expansion for future features.


## Decision Drivers

* Scalability
* Maintainability
* Performance

## Considered Options

* Monolithic Architecture
* Microservices Architecture
* 3-Tier Architecture

## Decision Outcome

The architecture style we choose was 3-Tier Architecture because it provides a clear separation between the presentation tier, 
application tier, and data storage tier. This allows for easier scalability and maintence due to each tier being updated or scaled as needed without impacting the other tiers.
This architecture is simple to implement for the current scope of the project and will easily support future growth without significant rework. The chief benefit of three-tier architecture is that because each tier runs on its own infrastructure, each tier can be developed simultaneously by a separate development team. And can be updated or scaled as needed without impacting the other tiers. (IBM. 2023)

### Consequences
#### Pros
* It allows for modularity and separation, making the system easier to maintain and scale.
* Each layer can be scaled independently based on performance needs.
* It provides a solid foundation for adding new features.
* Security is improved since the client does not have direct access to the database; it is more difficult for a client to obtain unauthorized data. Business logic is more secure because it is stored on a secure central server. (GeeksForGeeks. 2021, June 10)

#### Cons
* Introducing clear boundaries between layers requires careful planning and communication between layers, which could increase the initial development time.
* Communication between layers may hinder performance, although this is generally minimal.


### Confirmation
The decision to use a 3-Tier architecture has been confirmed as the best choice based on current project requirements. 
With this we can monitor the system's performance and scalability.


## Pros and Cons of the Options
### Monolithic Architecture
#### Pros
* Simplicity: Monoliths are relatively straightforward to develop and deploy since all the code resides in one place.
  This simplicity can be advantageous for projects with limited complexity.
* Debugging: With all code located in one place, it’s easier debug and find an issue.
#### Cons
* Deployment: A small change to a monolithic application requires the redeployment of the entire monolith.
* Less scalability: Because monolithic architecture software is tightly coupled, it can be hard to scale. If you want to add new features or your codebase grows, you will need to take the entirety of the architecture with you. (Davis, A. 2022, October 5)
Scaling a monolith typically involves replicating the entire application, which can be inefficient and costly.
* Slower development speed: A large, monolithic application makes development more complex and slower.

###  Microservices Architecture
#### Pros
* Improved fault isolation: Larger applications can remain mostly unaffected by the failure of a single module.
* Smaller and faster deployments: Smaller codebases and scope mean quicker deployments.
* Enhance team productivity - Microservices architecture allows small, focused teams to concentrate on a particular service’s development, deployment, and maintenance without being burdened by the complexities of the entire system. (Atlassian. 2024)
  
#### Cons
* Communication between services is complex: Since everything is now an independent service, you have to carefully handle requests traveling between your modules.
* Debugging: Each service has its own set of logs to go through.
* Deployment challengers: The product may need coordination among multiple services.

### Comparison
Monolithic is straightfoward to develop and deploy, making it a good fit for smaller applications or with limited complexity, however as the aplication grows the scalabilty becomes significant challenges, leading to bottlenecks and slower development. However microservice arcitecture excels in scaleability making it more ideal for bigger complex systems with dynamic needs, however, this comes at the cost of communication, testing and management of the service. Many projects initially start out as a monolith and then evolve into a microservice architecture. As new features are added to a monolith, it may start to become cumbersome to have many developers working on a singular codebase. (Harris, C. 2024)

### Referencing
* IBM. (2023). What is Three-Tier Architecture | IBM. Www.ibm.com. https://www.ibm.com/topics/three-tier-architecture
* GeeksForGeeks. (2021, June 10). Advantages and Disadvantages of Three-Tier Architecture in DBMS. GeeksforGeeks. https://www.geeksforgeeks.org/advantages-and-disadvantages-of-three-tier-architecture-in-dbms/
* Davis, A. (2022, October 5). The Pros and Cons of a Monolithic Application Vs. Microservices. Www.openlegacy.com. https://www.openlegacy.com/blog/monolithic-application
* Atlassian. (2024). 5 Advantages of Microservices [+ Disadvantages]. Atlassian. https://www.atlassian.com/microservices/cloud-computing/advantages-of-microservices

‌

‌

‌

‌
