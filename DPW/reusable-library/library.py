"""
Ben Forshey
DWP Online
19 Feb 2015
Reusable Library
"""

# create an class for wine labels
class WineLabel(object):
    def __init__(self):
        self.region = ''
        self.winery = ''
        self.grape = ''
        self.year = 0
        self.__price = 0  # set to private
        self.__personal_rating = 0  # set to private
        self.tasting_notes = ''

    # setters and getters (following convention)
    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, price):
        self.__price = price

    @property
    def personal_rating(self):
        return self.__personal_rating

    @personal_rating.setter
    def personal_rating(self, rating):
        self.__personal_rating = rating


class WineLabelUtilities(object):
    def __init__(self):
        self.__all_labels = []
        self.__all_years = []
        self.__all_prices = []
        self.__all_ratings = []

    # function to append whole label to library
    def add_label(self, label):
        self.__all_labels.append(label)

    # function to loop through all labels, format, and return for outputting in HTML
    def output_labels(self):
        content = ''  # initializing empty string for reference below
        for label in self.__all_labels:  # loop through and format
            content += '<div class="wine-block"><h3>From ' + label.region + '</h3><p><span class="label-category--header">Winery | </span><span class="label-category--body">' + label.winery + '</span></p><p><span class="label-category--header">Grape | </span><span class="label-category--body">' + label.grape + '</span></p><p><span class="label-category--header">Year | </span><span class="label-category--body">' + str(label.year) + '</span></p><p><span class="label-category--header">Price | </span><span class="label-category--body">' + str(label.price) + '</span></p><p><span class="label-category--header">Rating | </span><span class="label-category--body">' + str(label.personal_rating) + '</span></p><p><span class="label-category--header">Notes | </span><span class="label-category--body">' + label.tasting_notes + '</span></p></div>'
        return content  # return

    # function to convert (str to int) and add ratings
    def add_ratings(self, rating):
        rating_tens, rating_ones = rating.split('|')  # split the text string at the pipe
        rating_tens = int(rating_tens)  # convert to integer
        rating_ones = int(rating_ones)  # convert to integer
        rating = rating_tens + rating_ones  # perform the addition
        return rating  # return the sum

    # function to convert str to int or float and append to arrays
    # real hard time figuring this one out; this helped: http://stackoverflow.com/questions/3501382/checking-whether-a-variable-is-an-integer-or-not
    def convert_append_array(self, array, data):
        try:  # doing things The Python Way
            data = int(data.encode("utf-8"))  # try to convert the unicode from GET into UTF-8 int
            new_array = array.append(data)  # append the int onto the array
            return new_array  # return the new array
        except AttributeError:  # if I get an attribute error (which happens when I try to encode integers into UTF-8)
            new_array = array.append(data)  # append the int onto the array
            return new_array  # return the new array
        except ValueError:  # if I get a value error (which happens when I try to encode a input type number)
            data = float(data)  # convert to float
            new_array = array.append(data)  # append the int onto the array
            return new_array  # return the new array

    # function to average all the years from the wine library
    def average_all_years(self):
        total = 0  # set total (number of entries by which sum will be divided)
        temp_sum = 0  # set a temporary sum (to be divided by total) for averaging
        for year in self.__all_years:  # loop through the array
            total += 1  # add 1 to the total each loop
            temp_sum += year  # add the numeric value of each year to the temp sum
        return temp_sum / total  # return the average

    # function to average all the prices from the wine library
    def average_all_prices(self):
        total = 0  # set total (number of entries by which sum will be divided)
        temp_sum = 0  # set a temporary sum (to be divided by total) for averaging
        for price in self.__all_prices:  # loop through the array
            total += 1  # add 1 to the total each loop
            temp_sum += price  # add the numeric value of each year to the temp sum
        return round(temp_sum / total, 2)  # return the average (rounded to two decimal places)

    # function to average all the ratings from the wine library
    def average_all_ratings(self):
        total = 0  # set total (number of entries by which sum will be divided)
        temp_sum = 0  # set a temporary sum (to be divided by total) for averaging
        for rating in self.__all_ratings:  # loop through the array
            total += 1  # add 1 to the total each loop
            temp_sum += rating  # add the numeric value of each year to the temp sum
        return int(temp_sum / total)  # return the average (rounded to two decimal places)

    # setters and getters (no setters used below; all 'pass')
    @property
    def all_labels(self):
        return self.__all_labels

    @all_labels.setter
    def all_labels(self, label):
        pass

    @property
    def all_years(self):
        return self.__all_years

    @all_years.setter
    def all_years(self, year):
        pass

    @property
    def all_prices(self):
        return self.__all_prices

    @all_prices.setter
    def all_prices(self, price):
        pass

    @property
    def all_ratings(self):
        return self.__all_ratings

    @all_ratings.setter
    def all_ratings(self, rating):
        pass