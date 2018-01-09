# Software Development Model Comparison
The comparison is followed by documentation roughly covering the basic structure of the 
various methods compared.

## Comparison
As the [linked Wikipedia 
article](http:/e/en.wikipedia.org/wiki/Software_development_process) states, it's not 
uncommon for a combination of software development models to be used. In an effort to 
find something unique enough to be adequately compared, I took a high-level overview of 
the software development models given, and chose to compare the two that seemed to be 
most in contrast with each other, Waterfall and Agile.

Although not part of the comparison between Waterfall and Agile development methods, I 
think it's worth noting that Microsoft's SDL doesn't actually apear to speak to software 
development, but rather is a method to ensure best security practices when developing 
software using other methods. As such, it would seem to fit best as a Waterfall (or 
perhaps Incremental) method. This is, of course, just an analysis after a high-level 
overview of a handful of software development methods. More information can be found in 
the [Simplified Implementation of the Microsoft 
SDL](http://www.microsoft.com/en-us/download/details.aspx?id=12379).

There are probably many staunch proponents of the Waterfall method, and it's not my goal 
to undermine their experience (especially since my comparison is purely academic). I 
could imagine that the rigidity of the Waterfall method allows highly-specialized and 
proficient teams to do excellent work, then pass that excellent work onto another 
highly-specialized and proficient team. I could also imagine the rigidity of the 
Waterfall method fosters panic and inefficiency when mistakes happen, requirements 
change, and suprising feedback is given.

In contrast, Agile development (in general) seeks to emphasize quality people and 
teamwork over impecable planning. My own experience with tackling problems with a team 
leads me to favor the idea of Agile development. When I led a team of soliders in the 
Army, we'd have clearly defined objectives to tackle, well-reahearsed coordinated 
responses to barriers we'd likely face, and *always* the After Action Review (whose 
sole purpose was to make the team better at accomplishing the mission). Investing in 
people and team cohesion over planning out every possible response served me well; it 
appears to be serving the Agile development method well, too.

## Software Development Life Cycle
1. Initiate
	* Found a problem to solve, a need to be filled.
		* value-added reasoning
		* fact-finding sessions
	* May come away with a Project Initiation Document, or a Charter, or a Scope and 
Plan.

2. Define
	* Get input from SME (subject matter experts) to help define. Come away with Key 
Performance Indicators - Project Manager, Requirements - Business Analyst, Test Plan - 
Quality Assurance.

3. Design
	* Come away with functional specifications (FSPEC). QA, PM, BA will all have to 
update their plans, as the evolution of the design affects its definition.

4. Build
	* Should come away with a minimum viable product and some testing results.

5. Test
	* Designers and Developers should not be the only testers, as bias (*intentional 
or unintentional*) will cloud practical empathy.

6. Deployment
	* Deploy and restart SDLC as necessary / planned.

## Microsoft Security Development Life-cycle
1. Training
	* Core Security Training

2. Requirements
	* Establish Security and Privacy Requirements
	* Create Quality Gates / Bug Bars
	* Perform Security and Privacy Risk Assessments

3. Design
	* Establish Design Requirements
	* Attach Surface Analysis / Reduction
	* Use Threat Modeling

4. Implementation
	* Use Approved Tools
	* Depreciate Unsafe Functions
	* Perform Static Analysis

5. Verification
	* Perform Dynamic Analysis
	* Fuzz Testing
	* Attack Surface Review

6. Release
	* Create Incident Response Plan
	* Conduct Final Security Review
	* Certify Release and Archive

7. Response
	* Execute Incident Response Plan

## Waterfall Development
Considered a traditional, inflexible approach. Once a phase has been visited and 
completed, it is not revisited (hence the waterfall analogy).

1. Requirement Analysis
2. Software Design
3. Implementation
4. Testing
5. Integration
6. Deployment
7. Maintenance

## Software Protoyping
Not intended to stand on its own, but allows rapid creation of segmential (segments of 
the whole product) mock-ups, which allow relevant and timely feedback. Gives something 
to iteratevely develop upon.

## Incremental Development
Combine linear and interative development to reduce risk / make a better product. 
Typically mini-waterfalls are used, where the end result of the mini-waterfall is a 
segment or prototype that can be tested before moving on to the next mini-waterfall (the 
next segment).

## Iterative Development
Tackle small (but ever-increasing) segments of the project.

## Spiral Development
Segment the project, performing the same steps for each segment.

1. Determine Objectives, Alternatives, and Constraints
2. Evaluate Alternatives; Identify and Resolve Risks
3. Develop and Verify Deliverables
4. Plan the Next Iteration

## Rapid Application Development
Prefers iterative development and rapid prototyping. Segments the project, uses existing 
tools and methods to deliver products. In deadline vs quality, deadline wins (the needs 
of the business usually trump the needs of the user).

## Agile Development
Iterative and lightweight, attempts to be more people-centric than other methods. 
Popular versions of Agile Development include the following:

* Dynamic Systems Development Method (DSDM)
* Kanban
* Scrum

## Lightweight Methods
Can cross lanes with Agile Development, but has some unique methods.

## Code and Fix
Not really a method, but a naming the lack of a method. Usually the result of a 
high-pressure environment without proper planning. Bug fixes happen too late in the 
cycle to be efficient.
