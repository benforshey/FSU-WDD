'''
Ben Forshey
DWP Online
5 Feb 2015
Lab 1 Madlibs

A simple script that grabs user input and creates a Madlib-type story.

'''
##
# functions
##


def longevity(current, remaining):
    projected = int(current) + int(remaining)
    return str(projected)


def questionify(question, type, do_print):
    variable = type(question)
    if do_print is True:
        print "You answer: " + ' "' + variable + '."'
    else:
        return variable


def sequence(number, repeat):
    print
    integer = int(number)
    array = []
    array.append(integer)
    i = 0
    while i <= repeat:
        integer += integer
        array.append(integer)
        i += 1
    for n in array:
        print "It's " + str(n) + "...no..."

def title_maker(title):
    print
    print "###"
    print "# " + title
    print "###"
    print


##
# define and call variables
##

story = dict()
story = {
    'intro': "You're embarking on an adventure. Please answer the questions simply, as unexpected responses (putting in a number where the prompt is asking for text) may break the program.",
    'awake': "Consciousness comes to you like a wave of nausea rolling over you: oppressive and unwelcome. You're in a chair, comfortably draped. The room is a dimly lit holding cell. You hear a deep, scratchy voice saying, ",
    'verify': "You're pretty sure that your tongue is lead, but you manage to mumble out \"{user_name}...my name is {user_name}.\"",
    'disbelief': "The look in his eyes says he hasn't beleived anyone in a long time, and you're not about to change that. \"Sure...{user_name}.\", he says. \"You're supposed to be some kind of computer whiz, so you'll know how to answer this.\" He holds up a tablet with a blinking prompt.",
    'freedom': "\"You're free to go.\", he says. \"Rest assured that we'll be watching.\" You are not assured. Quickly glancing over your shoulder, you leave the holding cell and exit the compound, its all-too familiar maze of corridors giving you no pause. The last door you leave exits into a dark, wet alley. You start walking toward your apartment complex. As you near the main street, you hear a shape from the shadows mumbling...",
    'shadows': "A figure lurches out, suddenly looking at you with piercing green eyes \"...no, it's {birth_year}. But it's only {favorite_number} more. Only {favorite_number} more. {favorite_person} knows how long.\" The erie sing-song tone gives you a chill to your core, and you hurriedly step into the light of the main street. The last thing you hear from the alley is \"You are, for only {time_left}.\"",
    'home': "You can see your apartment complex now, the familiar doorman a reassuring sight. You nod to him and he moves as if to open the door, but his hand just remains on the worn brass handle. He looks with dull eyes, not at you, but off into the dark over your shoulder. His mouth moves as he drones...",
    'sleep': "You rush into the warm light, hoping to put this day behind you. You need sleep. You head to your apartment, enter, and collapse on your bed.",
    'exit': "Consciousness comes to you like a wave of nausea rolling over you: oppressive and unwelcome. What a weird dream. You've got to stop eating {favorite_fruit} before bed. You sit up from the chair you were draped across and glance at the flickering TV. It's turned to some late-night antique channel where a well-dressed appraiser is excitedly describing the \"find of a lifetime\", valued at ${time_left}."
}

title_maker('Introduction')
print story['intro']
favorite_person = questionify("Name your favorite person: ", raw_input, False)
favorite_fruit = questionify("Name your favorite fruit: ", raw_input, False)
favorite_number = questionify("Name your favorite whole number: ", raw_input, False)
birth_year = questionify("Name the year in which you were born: ", raw_input, False)
time_left = longevity(2015, favorite_number)

title_maker("Awake!")
print story['awake']
questionify("Are you awake? ", raw_input, True)
user_name = questionify("Citizen, what is your name: ", raw_input, False)
segment = story['verify'].format(**locals())
print segment
segment = story['disbelief'].format(**locals())
print segment
binary_number = questionify("Name the whole number represented by the binary number 101010: ", raw_input, False)

title_maker('Freedom?')
if binary_number == "42":
    print
    print 'He looks surprised. "Okay, ' + user_name + '. That\'s pretty good."'
else:
    print
    print '"Hmmm, let\'s hope you\'re smarter after the meds wear off."'
print story['freedom']
sequence(favorite_number, 4)

title_maker("Shadows")
segment = story['shadows'].format(**locals())
print segment

title_maker("Home Again")
print story['home']
octothorpe = questionify("Answer the following question: The # symbol is called a/an: ", raw_input, False)
if octothorpe == "octothorpe" or octothorpe == "Octothorpe" or octothorpe == "octotherp" or octothorpe == "Octotherp":
    print "You see a look of surprise flash across his otherwise expressionless face. \"You are aware, for someone who soon will not...\" He says no more as the dullness regains his visage. He opens the door."
    print
elif octothorpe == "hash" or octothorpe == "Hash" or octothorpe == "hash tag" or octothorpe == "Hash tag" or octothorpe == "Hash Tag" or octothorpe == "hashtag" or octothorpe == "Hashtag":
    print "You see a look of anger flash across his otherwise expressionless face. \"Twitter will not save you from what they...\" He says no more as the dullness regains his visage. He opens the door."
    print
elif octothorpe == "pound sign" or octothorpe == "Pound Sign" or octothorpe == "Pound sign" or octothorpe == "pound Sign" or octothorpe == "pound" or octothorpe == "Pound":
    print "You see a look of sadness flash across his otherwise expressionless face. \"Conformity hasn't saved you so far from what they...\" He says no more as the dullness regains his visage. He opens the door."
    print
else:
    print "You see a look of sadness flash across his otherwise expressionless face. \"Your blindess hasn't saved you so far from what they...\" He says no more as the dullness regains his visage. He opens the door."
    print
print story['sleep']

title_maker('The Exit')
segment = story['exit'].format(**locals())
print segment
