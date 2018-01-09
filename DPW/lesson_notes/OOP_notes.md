# Simon Allardice: Object-Oriented Programming

## Core Concepts

### Objects
Object-Oriented Programming is designed to help programmers solve problems by modeling the real world. The concept of objects is found in the real world. Objects are independent of each other (turning one lamp off doesn't turn all lamps off). Objects have Identity (they are unique), Attributes (hair density, height, color, fullness), and Behavior (run, talk, sleep).

Objects can be intangibles: a bank account, a date. Objects are nouns; you could use "the" in front of something that could be an object. "The car" (an object), not "the accelerating" (a behavior); "The grenade" (an object), not "the exploding" (a behavior).

### Classes
Object and classes are inseparable. We use classes to create objects. Classes are the blueprints for objects. A class has a name (type), attributes (properties / data), and behaviour (operations). When a class behavior is written in code, it is typically called a Method. Many languages have default classes (usually called libraries).

### Abstraction
*To remember Abstraction, Polymorphism, Inheritance, and Encapsulation, remember "A PIE".*

Have an idea that is separate from an instance. Focus on the essential qualities of the idea. Ask what the object should look like for *this application (this program)* of its use to avoid unnecessary attributes and weight.

### Polymorphism
Lets us automatically do the correct behavior even if what we're working with could take one of many forms. e.g., the "+" sign. Integers are added, strings are concatenated. Correct but different behavior (corrent one of many forms). Subclass can override behavior in  superclass with specific behavior (define its own behavior when necessary, but inherit when not necessary to define its own behavior).

### Inheritance
A great form of code reuse. Inherit all from one class, to make another class. e.g., Person class isn't Customer class, but if you have a Person class (Superclass / Parent Class) created, you can create from it a Customer class (Subclass / Child Class) that inherits everything about it. Abstraction demands that you only make the Superclass as "big" as is needed. Make other Subclasses with additional properties (attributes) and operations (beaviors) as needed.

### Encapsulation
To surround something, to keep together and protect. Bundle attributes and behaviors together; restrict access to those attributes and behaviors. That's called information hiding / data hiding. An object should not reveal anything about itself other than what's absolutely necessary for the application to work. Also called Black Boxing. It's not about being secretive, it's about reducing dependencies between different parts of the application.

## Object-Oriented Analysis and Design

### Understanding the Processes
1. gather **requirements**
    * what the app *will do* vs what the app *could do*
2. **describe** the application
    * use cases and user stories
    * smallest set of stories that will make this a real application
    * may change; that's okay
    * may create a mockup of UI, but maybe not
3. **identify** the main objects
    * pick out most important ideas and things
4. describe the **interactions**
    * e.g. "Customer needs to open a bank account."
    * sequence diagram
5. create a **class diagram**
    * get specific about inheritance and polymorphism, etc.

### Defining Requirements

* functional requirements: what does it do?
    * features / capabilities
    * not the hundred cool things that the application *could* do, but what is *must* do (at least intially)

* non-functional requirements: what else?
    * help
    * legal
    * performance
    * support
    * security

* FURPS / FURPS+
    * functional requirements
    * usability
    * reliability
    * performance
    * supportability
    * +
        * design requirements
        * implementation requirements
        * interface requirements
        * physical requirements

Write it down! It's perfectly acceptable in an Agile or Iterative approach to cut to the bare minimum. "Not essential" is an okay reply! Build your core features well, then build your additional features well.

### UML (Unified Modeling Language)
More complex than I'll use, but great for class diagrams in object-oriented languages. Knowing a little UML is more useful than knowing a lot of UML (in most cases). It's a quick tool-a support system for your brain.
