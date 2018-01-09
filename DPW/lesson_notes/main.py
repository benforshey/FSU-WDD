# print "Hello World!"

'''
multiple line comments (called docstrings)
Python is whitspace sensitive. Doesn't use brackets for scope; uses indentation for scope.
Python is strongly typed (no behind the scene string to integer conversions), but dynamic (type is bound to var, but var doesn't have a static type).
Semicolons are separators, not terminators; multiple statements on one line require semicolons.
Python style guide: https://www.python.org/dev/peps/pep-0008/
'''

# first_name = 'Kermit'
# last_name = 'De Frog'
# print first_name

# response = raw_input("Enter your name: ")
# print 'Hi, ', response


birth_year = 1955
current_year = 2015
age = current_year - birth_year

# ways to avoid TypeError for concatenating string and integer.
# print 'You are', age, 'years old.'
# print 'You are ' + str(age) + ' years old.'


'''
no increment and decrement operators (++ and --)
+= -+ *= /=
age = age +3 is the same as age += 3
'''


# conditional operators
# if age > 18 and age < 60:
#     print "You are considered an adult."
# elif age >= 60:
#     print "You are considered a senior citizen."
# else:
#     pass
    # print "You are still considered a child."

fruit = ["apple", "bannanna", "kiwi"]
# print fruit
fruit.append("pear")
# print fruit
# print fruit[3]

# instantiate an associative array (object)
# vegetables = dict()
# vegetables = {"okra":"disgusting", "cucumber":"false", "potato":"delicious"}
# print vegetables["okra"]


# #while loop
# i = 0
# while i <= 10:
#     print "The while count is " + str(i)
#     i += 1
#
# #for loop
# for i in range(0, 10):
#     print "The for count is " + str(i)
#     i += 1
#
# #"for each"
# for e in fruit:
#     print e
#
# # functions
# def calcArea(height, width):
#     area = height * width
#     return area
#
# area = calcArea(20, 40)
# print "The areas of your rectangle is " + str(area) + " feet squared."

# formatting messages
weight = 190
height = 71
message = '''
Your weight is {weight} and you are {height} inches tall.
'''
message = message.format(**locals())
print message
