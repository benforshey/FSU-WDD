class Toy(object):  # the class toy inherits from object
    def __init__(self):  # initialize the instance
        self.material_list = []  # what materials would this toy be made of
        self.color_list = []  # what colors would this toy be made of
        self.__condition = 'used'

    def play(self):  # define a method for toy
        # code for playing with a toy

class PopGun(Toy):
    def __init__(self):  # initialize the instance
        super(PopGun, self).__init__()  # initialize superclass in subclass
        self.name = "Popomatic 3000"
        self.range = 7

    def play(self):  # define a method (using the same name as superclass) for this subclass
        # code for playing with a pop gun, specifically


class WritingInstrument(object):
    def __init__(self):
        self.permanent = True  # most writing is permanent
        self.length = 5.5  # arbitrary length
        self.weight = 0.4  # arbitrary weight

    def write(self, words):
        mark_on_surface(words)  # pseudo code that assumes an inherited / library method

    def unwrite(self, words):
        destroy(words)  # pseudo code that assumes an inherited / library destroy method


class Pencil(WritingInstrument):
    def __init__(self):
        super(Pencil, self).__init__()
        self.permanent = False  # a pencil can be erased
        self.length = 5.9  # arbitrary length
        self.weight = 0.7  # arbitrary weight

    def write(self, words):
        mark_on_surface(words)  # pseudo code that assumes an inherited / library method
        self.length -= 0.01  # a pencil, specifically, would get shorter when used to write

    def unwrite(self, words):
        erase(words)  # again, assuming an library / inherited method, this would erase words instead of destroying them
        self.length -= 0.01  # a pencil, specifically, would get shorter when used to erase
        
        
