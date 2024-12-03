---
status: Accepted
date: 03/12/2024
decision-makers: All
consulted: All
informed: All
---

# Choosing MongoDB as the database for the Advanced Library Management System

## Context and Problem Statement

The Advanced Library Management System requires a database to efficiently manage structured and semi-structured data, including books, user profiles, borrowing and reservation record. The database must provide scalability, flexibility and seamless integration with the chosen Technology Stack (React + Node.js). It must also support dynamic schema changes, given the evolving nature of the systems requirements.

## Decision Drivers

- Flexibility in handling structured and semi-structured data
- Seamless inegration with the Node.js back-end
- Scalability for large datasets
- Fast developement and iteration cycles

## Considered Options

1. MongoDB
2. PostgreSQL
3. MySQL

## Decision Outcome

We chose **MongoDB** for the Advanced Library Management System because of its flexibility with semi-structured data and strong integration with Node.js. Its document-based structure aligns well with the JSON data exchange format used in modern web development, enabling faster development cycles.

### Consequences

#### Pros

- **Flexible Schema Design:** MongoDBs document-based structure allows for easy schema evolutionm, reducing the complexity of migrations as the system grows.
- **JSON-Friendly:** Direct support for JSON documents simplifies data exchange between the database and the Node.js back-end (GeeksforGeeks, n.d.).
- **Scalability:** MongoDB is designed to scale horizontally, making it ideal for applications with growing data requirements (MongoDB, n.d.).
- **Node.js Integration:** MongoDB integrates seamlessly with Node.js through libraries like Mongoose, enabling efficient development (Hevo Data, n.d.).


#### Cons

- **Lack of Strong ACID Compliance:** While MongoDB supports ACID transactions at the document level, it may require additional effort for complex multi-document transactions (GeeksforGeeks, n.d.).
- **Limited Relational Features:** Queries requiring complex joins may be less efficient compared to relational databases like PostgreSQL (Hevo Data, n.d.).


## Pros and Cons of the Options

### MongoDB
#### Pros
- Flexible schema, enabling rapid iteration and development.
- JSON-like documents align naturally with JavaScript, easing data handling in a Node.js environment.
- Horizontal scaling capabilities for large datasets (MongoDB, n.d.).

#### Cons
- Less suitable for applications with strict relational data requirements.
- Transactions across multiple collections or documents require additional consideration (GeeksforGeeks, n.d.).

### PostgreSQL
#### Pros
- Advanced relational capabilities and robust ACID compliance.
- Suitable for applications with complex joins and relational data models.

#### Cons
- Rigid schema design compared to MongoDB, requiring migrations for schema changes.
- Higher setup and maintenance effort for schema evolution (Hevo Data, n.d.).

### MySQL
#### Pros
- Simple setup and ease of use for traditional relational data models.
- Widely supported with extensive community resources.

#### Cons
- Limited support for handling semi-structured data or flexible schemas.
- Relatively less performant for applications requiring complex data relationships or high scalability.

## Comparison

While PostgreSQL and MySQL are strong candidates for relational use cases, MongoDBs flexibility and scalability make it the best choice for this project. Its document-based strucure allows for rapid iteration and seamless integration with the chosen Node.js back-end, ensuring the system can evolve alongside changing requirements.

## References

1. GeeksforGeeks. (n.d.). *MongoDB Advantages & Disadvantages*. Retrieved from [https://www.geeksforgeeks.org/mongodb-advantages-disadvantages/](https://www.geeksforgeeks.org/mongodb-advantages-disadvantages/)
2. Hevo Data. (n.d.). *MongoDB vs PostgreSQL: A Detailed Comparison*. Retrieved from [https://hevodata.com/learn/mongodb-vs-postgresql/](https://hevodata.com/learn/mongodb-vs-postgresql/)
3. MongoDB. (n.d.). *Sharding Introduction*. Retrieved from [https://www.mongodb.com/docs/manual/sharding/](https://www.mongodb.com/docs/manual/sharding/)

