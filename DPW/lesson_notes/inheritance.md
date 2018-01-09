# Inheritance

* base an object off another object
* inheritance relationship can be called one of two things (same thing, different name)
	* superclass / subclass
	* parent class / child class
* parent class is more general, child class is more specific
* parent of one class can be child of another
* Class Litmus Test: "subclass" is also a "superclass"
	* e.g., "Button" is also an "InterfaceElement"
	* "EmailButton" is also a "Button"
* private attributes aren't inherited "self.__attribute"
* protected "self._attribute" and public "self.attribute" are inherited

```
class Button(object):
	def __init__(self):
		self.__label = "Submit"		
		self._user_name = ""
	
	@propety
	def function(self):
		return self.__label

class EmailButton(Button):
	def __init__(self):
		# one of the two following ways MUST be used to invoke parent class' constructor method
		super(EmailButton, self).__init__() # one way to initialize parent class inside of child class
		Button.__init__()  # another way to initialize parent class inside of child class 
		self.__email = "example@example.com"
		self._user_name = "John DaDoe"
```