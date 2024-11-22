---
status: Accepted
date: 21/10/2024
decision-makers: Joe
consulted: All
informed: All
---

# Security Decision

## Context and Problem Statement

The system will handle incoming and outgoing data and this data needs to be unmodified by any external parties in transmission.

## Decision Drivers

* Regulatory Complience: Meet legal obligations for data protection (e.g. GDPR)
* Customer trust: Ensure that customers using the website feel confident that their data is secure.
* Feasability: Ensure that the solution intergrates with the AML withoutt any disruptions.

## Considered Options

* Data Protection
* Network Security
* User awareness campaign
  
## Decision Outcome

Chosen option: Data Protection: This directly adresses the core issue of keeping sensetive data safe and ensures complience with regulatory boards. Applying strong data protection measures and safeguards not only protects individuals’ or customers’ personal data, but also your organisation’s data. Therefore avoiding considerable problems, which may damage your reputation or your organisations’ confidential information. (EDPB. n.d.).

### Consequences
#### Pros
* Meets regulatory complience requirements
* Reduce the risk of data breaches
* Supports scaleabilitty for future data security

#### Cons
* May require initial investment and development time
* Complex in implementation

### Confirmation

Implementation will be confirmed through regular security audits and comprehensive penetration testing and incident simulators.

## Pros and Cons of the Options

### Network Security
#### Pros
* Provides robust defense against external threats
* Builds a secure network perimiter

#### Cons
* This does not adress the core issue of data security and regulatory complience
* Insider threats and misconfigurations could compromise sensetive data
* Time Consuming Some of the software on some networks is difficult to use. To maintain double security, it requires authentication using two passwords, one of which must be entered every time you update a document. (Advantages and Disadvantages of Network Security. 2022, May 6)

### User Awareness 
#### Pros
* Increases employeess vigilance and can help reduce phising risks.
* Low cost and fast to train the staff

#### Cons
* Very basic and insufficient stratergy to implement data.
* Relies on human behavoiur which can cause problems in the future due to human error

### Comparison
Network security focuses more on securing the infrastructure and the communication channels which data travels through. It involves measures like firewalls and intrusion detection systems. This approach is good to install a network perimiter and is effective at blocking cyber security attacks like malware, DDOS and phishing. However as the network becomes more complex whith more endpoint being implemented securing all of these becomes challenging and time consuming. On the other hand data protection is cented around safeguarding data itself regardless of where it is or how it is accessed. This involves incryption, access controlls and ensures complience with regulatory bodies. However it may not adress other external threats which network security does which offers a more layered defence.

While network security is concerned with defending the network from attacks, data protection ensures that even in the event of a breach, the data remains secure and compliant with legal standards. Both are crucial to an organization's overall security strategy, but they address different aspects of the digital environment. (Cybersecurity vs. Data Protection: Understanding the Differences. (2024, September 5). Techpulseinsider)

### References
* EDPB. (n.d.). Data protection benefits for you | European Data Protection Board. Www.edpb.europa.eu. https://www.edpb.europa.eu/sme-data-protection-guide/data-protection-benefits-for-you_en
* Advantages and Disadvantages of Network Security. (2022, May 6). Careerera.com. https://www.careerera.com/blog/advantages-and-disadvantages-of-network-security
* Cybersecurity vs. Data Protection: Understanding the Differences. (2024, September 5). Techpulseinsider -. https://www.techpulseinsider.com/cybersecurity/cybersecurity-vs-data-protection-understanding-the-differences/



