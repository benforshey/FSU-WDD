#!/bin/bash
# This is the script I created for the lynda.com exercises.

# Internal Variables / Understanding Variables
i01=$BASH 			# path to bash binary
i02=$BASH_VERSION		# version of bash
i03=$EDITOR			# default editor
i04=$GROUPS			# groups to which current user belongs
i05=$HOME			# home directory of current user
i06=$MACHTYPE			# identify system hardware
i07=$OSTYPE			# operating system type
i08=$PATH			# path to binaries
i09=$PWD			# print working directory

# Understanding Quotes
#echo $i02
#echo '$i02'
#echo "$i02"

# Adding Attributes
	# -i is an integer
	# -r is read-only
	# -l is toLowercase
	# -u is toUppercase

# Command Substitution
#cs01=$(ls -lah)		#simplified example, but the principle is useful

echo $cs01

# Arithmetic Operations
	# must be wrapped in (( ))
	# only does integers; pipe into bc for floating point
arith01=5
#echo $arith01

arith02=$((arith01+10))
#echo $arith02 'added 10 and assigned to other var'

arith03=$((10/3))
#echo $arith03 'divided 10 by 3'

arith04=$(echo 10/3 | bc -l) # bc wasn't installed by default, so beware dependency failures
#echo $arith04 'divided 10 by 3 piped into "bc"'
#echo 'bc was not installed by default, so beware dependency failures'

((arith01++))
#echo $arith01 '++'

((arith01--))
#echo $arith01 '--'

((arith01+=5))
#echo $arith01 '+=5'

((arith01*=5))
#echo $arith01 '*=5'

((arith01/=5))
#echo $arith01 '/=5'

((arith01-=5))
#echo $arith01 '-=5'

# Comparison Operators
	# syntax [[ "compare" ==/= "compare" ]]
	# see http://tldp.org/LDP/abs/html/ for all comparison operators
	# -z is null; -n is not null

comp01=""
comp02="string"

#echo '0 = success'
#echo '1 = failure'

[[ -z $comp01 && -n $comp02 ]]
#echo $?
#echo 'tested two strings for null and not null'

[[ "word" == "word" ]]
#echo $?
#echo 'tested word == word'

[[ "word" = "word" ]]
#echo $?
#echo 'tested word = word'

[[ 20 > 100 ]]
#echo $?
#echo 'tested 20 > 100; compared as strings (lexically greater than)'

[[ 20 -gt 100 ]]
#echo $?
#echo 'tested 20 > 100; compared as integers'

# Working with Strings
	# ${#string_var} will give the length of a string
	# in string replacement / replaces one instance and // replaces all instances
	# in string replacement # replaces only if match is found at beginning of string
	# in string replacement % replaces only if match is found at end of string
str01="Lorem ipsum this is not! My text is hand-typed."
str02=${str01:32}
str03=${str01:32:5}
str04=${str01: -32}
str05=${str01: -32:5}
str06=${str01/i/"_replaced first_"}
str07=${str01//i/"_replaced all_"}

#echo '"'$str01'"'
#echo 'That string is' ${#str01} 'characters long.'
#echo '"'$str02'"' '...is the above string beginning at the 32nd character.'
#echo '"'$str03'"' '...is the same string beginning at the 32nd character printing only 5 characters.'
#echo '"'$str04'"' '...is the same string printing 32 characters, but counting from the end.'
#echo '"'$str05'"' '...is the same string printing 32 characters, counting from the end, but only printing the first 5.'
#echo 'text replacement (first instance of) ' $str06
#echo 'text replacement (all instances of) ' $str07

# Coloring and Styling Text
	# can style with ANSI styles
	# can style with tput (dependency failure?)

# Date and Time
	# man date
#echo $(date) 'is the command date'
#echo $(date +"%d-%m-%Y") 'is the command date +"%d-%m-%Y"'

# Print out Information
	# %t is tab
	# %n is new line
	# %d is digit (with %xxd being the number of digits you want to pad)
	# %s is string
	# more character types found at http://en.wikipedia.org/wiki/Printf_format_string#Type
	# command substitution strips out newline char, so use printf -v var_name to assign the layout to a var
date=$(date +"%d")
month=$(date +"%m")
printf -v layout "Day:\t\t\t%02d\nMonth:\t\t\t%02d\nBash Version:\t\t%s\n" $date $month $i02
echo "$layout"

# Arrays
	# 0 based, but not comma delineated, and can be sparse
	# append to array with =+
	# associative arrays not supported in <= bash 3
arr01=("CPU" "RAM" "SDD" "HDD")
declare -A arr02 # associative array (like objects in JavaScript)
arr02[weight]="192 lbs"
arr02["eye color"]=grey
arr02[height]="5\' 11\""

#echo ${arr01[3]} 'specific index'
#echo ${arr01[@]} 'entire array'
#echo ${arr01[@]: -1} 'last element'
#echo ${arr01[3]: -1} 'last character of specific element'

#echo I am ${arr02[weight]} and have ${arr02["eye color"]} eyes.

# Reading and Writing Text Files
#echo "some text" > text_1.txt 			# creates and concatonates text into file
#cat text_1.txt					# displays contents of file
#> text_1.txt					# zeros out file
#cat text_1.txt					# displays contents of file
#echo "some text" > text_2.txt			# concats text into file
#echo "followd by more text" >> text_2.txt	# adds to end of file
#cat text_2.txt					# displays contents of file


# Here Document
	# can set limit string (just a unique string) to feed text into document
	# <<- the dash strips out the leading tab (lets me format as I please in script for readability)
cat <<- LimitString_01
	**Good Design**

	is innovative
	makes a product useful
	is aesthetic
	makes a product understandable
	is unobtrusive
	is honest
	is long-lasting
	is thorough down to the last detail
	is environmentally friendly
	is as little design as possible
LimitString_01
