"""
Ben Forshey
DWP Online
26 Feb 2015
Dynamic Site
"""

from library import RopeUtilities

# set class (will be abstract) for inheritance
class TensileLoadBearing(object):
    def __init__(self):
        self.__diameter = 0.00  # initialize as a float
        self.__length = 0.00  # initialize as a float
        self.__name = ""  # initialize as string
        self.__strength = 0.00  # initialize as a float
        self.__weight = 0.00  # initialize as a float

    # getters and setters for each private attribute
    @property
    def diameter(self):
        return self.__diameter

    @diameter.setter
    def diameter(self, d):
        self.__diameter = d

    @property
    def length(self):
        return self.__length

    @length.setter
    def length(self, l):
        self.__length = l

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, n):
        self.__name = n

    @property
    def strength(self):
        return self.__strength

    @strength.setter
    def strength(self, s):
        self.__strength = s

    @property
    def weight(self):
        return self.__weight

    @weight.setter
    def weight(self, w):
        self.__weight = w

# define new class, inheriting from abstract class TensileLoadBearing
class Rope(TensileLoadBearing):
    def __init__(self):
        super(Rope, self).__init__()  # constructor function for superclass
        self.__cost = 0.00  # initialize as float (cost per unit initially expressed in feet; define unit in library function)

    # getters and setters for private properties
    @property
    def cost(self):
        return self.__cost

    @cost.setter
    def cost(self, c):
        self.__cost = c

# information pulled from http://briangreen.net/2011/01/cord-weightstrengthcost-comparisons.html
class ClimbingRopes(Rope):
    def __init__(self):
        super(ClimbingRopes, self).__init__()  # constructor function for superclass

        util = RopeUtilities()  # Rope Utilities to perform various methods (from library.py) on ropes

        milspec = Rope()  # 1st instance of Rope, with >= 5 attributes
        milspec.cost = 0.07
        milspec.name = "MilSpec"
        milspec.strength = 550
        milspec.weight = 0.07
        milspec.unit_price = util.cost_per_unit(milspec.cost, 'ft')
        milspec.ratio = util.cost_to_strength(milspec.cost, milspec.strength)

        kelty = Rope()  # 2nd instance of Rope, with >= 5 attributes
        kelty.cost = 0.30
        kelty.name = "Kelty Guyline"
        kelty.strength = 188
        kelty.unit_price = util.cost_per_unit(kelty.cost, 'ft')
        kelty.weight = 0.024
        kelty.ratio = util.cost_to_strength(kelty.cost, kelty.strength)

        spectra = Rope()  # 3rd instance of Rope, with >= 5 attributes
        spectra.cost = 0.45
        spectra.name = "Spectra 725"
        spectra.strength = 726
        spectra.unit_price = util.cost_per_unit(spectra.cost, 'ft')
        spectra.weight = 0.024
        spectra.ratio = util.cost_to_strength(spectra.cost, spectra.strength)

        tether = Rope()  # 4th instance of Rope, with >= 5 attributes
        tether.cost = 0.03
        tether.name = "Tether Cord"
        tether.strength = 150
        tether.unit_price = util.cost_per_unit(tether.cost, 'ft')
        tether.weight = 0.028
        tether.ratio = util.cost_to_strength(tether.cost, tether.strength)

        aircore = Rope()  # 5th instance of Rope, with >= 5 attributes
        aircore.cost = 0.80
        aircore.name = "Aircore Plus"
        aircore.strength = 1109
        aircore.unit_price = util.cost_per_unit(aircore.cost, 'ft')
        aircore.weight = 0.036
        aircore.ratio = util.cost_to_strength(aircore.cost, aircore.strength)

        # dict for key:value matching as a way to return information to MainHandler
        self.ropes_dict = dict()
        self.ropes_dict = {"milspec":[milspec.cost, milspec.name, milspec.strength, milspec.unit_price, milspec.weight, milspec.ratio],
                            "kelty":[kelty.cost, kelty.name, kelty.strength, kelty.unit_price, kelty.weight, kelty.ratio],
                            "spectra":[spectra.cost, spectra.name, spectra.strength, spectra.unit_price, spectra.weight, spectra.ratio],
                            "tether":[tether.cost, tether.name, tether.strength, tether.unit_price, tether.weight, tether.ratio],
                            "aircore":[aircore.cost, aircore.name, aircore.strength, aircore.unit_price, aircore.weight, aircore.ratio]}  # put instances in array as method of class for use in MainHandler

    # method to return the correct array of information
    def rope_lookup(self, rope):
        ropes_dict = self.ropes_dict
        return ropes_dict[rope]