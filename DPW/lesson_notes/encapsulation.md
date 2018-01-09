# Encapsulation & Review
*Keeping private things, private.*

## Attribute Review
* values that describe characteristics of that object
* they are traits, scoped to their class
* synax of: instance.attribue = value

## Access Modifiers
* public
    * accessible by any other object
    * self.attribute
    * self.method()
* protected
    * accessible by sub-classes (by convention; can actually still access by instance._attribute = value)
    * self._attribute
    * self._method()
* private
    * accessible only within the class from which it was defined (can be accessed by instance._Class__attribute = value; never do that!)
    * self.__attribute
    * self.__method()
* getters and setters allow access
    * getters allow read
    * setters allow write
* when to limit?
    * good to default to security
    * "play it safe"
    * Data Objects usually contain many public class members

## Encapsulation
* do it to protect variables from your future self (or other devs)
* think of a Bank Metaphor; you don't want all attributes publicly accessible
* properties are a special kind of attribute (in the same way that attributes are a special kind of variable)
    * created for special access
    * use Decorators: "@Decorator"
    * this makes the function to be treated like a variable
* Decorators for properties
    * @property (makes getters)
    * @attribute.setter (makes setters)
    * @attribute.deleter (makes deleters)
* Getters are special functions designed to grab data
    * can be read only (if no setter)
    * if you want read/write, add a setter
* Setters are special functions to write only
    * can never be made without a getter, first
    * could create empty getter to make setter write only
    * can create useful error messages in setters
