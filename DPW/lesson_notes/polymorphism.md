# Polymorphism
*many forms*

* subclasses may need additional variation from superclass
*  a behavior in the subclass that overrides (via method overriding) the superclass' behavior is a specific form of Polymorphism
*  gives flexibility, add as needed
*  the exception, not the rule 

```
class Player:
	def __init(self):
		self.__playlist = []

	def play(self):
		# code for playing audio and video

class AudioPlayer(Player):
	def __init__(self):
		super(AudioPlayer, self).__init__()

	def play(self):
		# code for playing audio only
		# polymorphism (same method name)is overriding superclass' method
```
