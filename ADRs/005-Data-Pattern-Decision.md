---
status: Accepted
date: 15/10/2024
decision-makers: All
consulted: All
informed: All
---

# Data Patern - MVC

## Context and Problem Statement
The goal is to determine the data pattern we are going to use for structuring thte applicaion to ensure scalability, performance and ease of intergration. We are evaluating if MVC alligns with these goals.

## Decision Drivers

* Scalability
* Performance
* Flexibility
  
## Considered Options

* MVC
* Flux
* MVP

## Decision Outcome

* We have decided to use MVC pattern.

### Consequences
#### Pros
* Faster Development Process: While developing any specific web application, MVC architecture could be put to better use. Through this architectural pattern, one programmer could work on its view component, while the other one could work on the other component. (Benefits and Drawbacks of MVC Architecture – Shrey Sharma, n.d.)
* Easily Modifiable - MVC makes it easy to implement modifications to the entire app. Adding or updating the view is simplified in the MVC pattern, as each section is independent. (Model-View-Controller Architecture Pattern: Usage, Advantages, Examples | HackerNoon, n.d.)

#### Cons
*Steeper Learning Curve: For beginners, understanding and implementing MVC properly can be challenging, especially when dealing with the interactions between Model, View, and Controller. (What Is MVC? Advantages and Disadvantages of MVC ⋆ ALexHost SRL, 2024)

### Confirmation
The decision alligns with our project specification and team skills.

## Pros and Cons of the Options
### Flux
#### Pros
* Ensures a unidirectional data flow which reduces potential bugs.
* Works well with frontends like React
* Flux architecture is better in an application where views don’t map directly to domain stores. To put it in a different way, when views can create actions that will update many stores and stores can trigger changes that will update many views. (Nipun Dimantha, 2021)
#### Cons
* Flux can add unnecessary complexity to an application where each view maps to one store. In this kind of application, a separation between view and store is enough. (Nipun Dimantha, 2021)
* Implementing Flux requires a significant amount of boilerplate code, including setting up actions, the dispatcher, and stores (Sharma, 2024)
###  MVP
#### Pros
* Simpler, clear separation of concerns between UI and Presenter.
* Presenter is unit-testable independently of the Android framework.
* Easier to understand, especially for those familiar with traditional patterns.
  (Gideon, 2024)
  
#### Cons
* No built-in data binding, requiring manual UI updates.
* Less flexibility for complex UI interactions.
(Gideon, 2024)
### Comparison
Overall MVC seperates application logic, this allows for scalability, performance making it easy to modify views of models and controllers. However it has a steeper learning curve due to its interactions between the components. It allows for team members to work on different components simultaniously which makes development faster. However MVP offers a more simple and easier to understand and implement, especially for smaller and mid sized applications. However MVP lacks the ability for built in data binding requiring manual updates which may lead to complex UI interactions compared to MVC.

### Referencing
*  Benefits and Drawbacks of MVC Architecture – Shrey Sharma. (n.d.). https://shreysharma.com/benefits-and-drawbacks-of-mvc-architecture/
*  Model-View-Controller Architecture Pattern: Usage, Advantages, Examples | HackerNoon. (n.d.). Hackernoon.com. https://hackernoon.com/model-view-controller-architecture-pattern-usage-advantages-examples
*  What is MVC? Advantages and Disadvantages of MVC ⋆ ALexHost SRL. (2024, October 10). ALexHost SRL. https://alexhost.com/faq/what-is-mvc-advantages-and-disadvantages-of-mvc/
*  Nipun Dimantha. (2021, March 7). Flux Pattern Architecture in React - Webtips - Medium. Medium; Webtips. https://medium.com/weekly-webtips/flux-pattern-architecture-in-react-35d0b55313f6
*  Sharma, S. (2024, July 10). Understanding React Flux: A Comprehensive Guide. Yourteaminindia.com; ValueAppz Solutions Private Limited. https://www.yourteaminindia.com/tech-insights/understanding-react-flux
*  Gideon, O. O. (2024, March 26). MVVM(Model-View-Viewmodel) vs MVP(Model-View-Presenter). Medium. https://medium.com/@deonolarewaju/mvvm-model-view-viewmodel-vs-mvp-model-view-presenter-76011cdc5b7f
‌

‌

‌

‌
