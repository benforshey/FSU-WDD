"""
Ben Forshey
DWP Online
26 Feb 2015
Dynamic Site
"""

class RopeUtilities(object):
    def __init__(self):
        pass

    # takes cost per foot and maths it to cost per 100 ft
    def cost_per_unit(self, c, u):
        cost = (c * 100)  # moving the decimal place
        unit = u  # store the unit as a string for concatenation
        blurb = "$" + str(cost) + " per 100 " + unit + "."  # format into string and concatenate
        return blurb  # return to calling var

    # takes original measurement of ounces per foot and maths it to lbs per 100 ft
    def weight_per_unit(self, w, u):
        weight = (w * 100)  # moving the decimal place
        weight = weight / 16  # 16 ounces in a pound; convert to pound
        weight = round(weight, 2) # round to decimal place value
        unit = u  # store the unit as a string for concatenation
        blurb = str(weight) + "lbs per 100 " + unit + "."  # format into string and concatenate
        return blurb  # return to calling var

    # function to determine cost to strength ratio
    def cost_to_strength(self, c, s):
        cost = (c * 1000)  # a bit arbitrary, but moving the decimal to look better
        strength = s  # temp store strength
        quotient = cost / strength  # do the actual quotient math
        quotient = round(quotient, 2) # round to 2 decimal places due to large range of results in rope
        return str(quotient) + " (the smaller the better). "  # concat and return