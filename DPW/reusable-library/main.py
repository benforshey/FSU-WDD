"""
Ben Forshey
DWP Online
19 Feb 2015
Reusable Library
"""

import webapp2
from html_templating import FormTemplate, ResultsTemplate
from library import WineLabel, WineLabelUtilities


class MainHandler(webapp2.RequestHandler):
    def get(self):

        wlu = WineLabelUtilities()  # create instance of utilities

        wl_1 = WineLabel()  # create new instance of WineLabel
        wl_1.region = 'Willamette Valley'  # set region
        wl_1.winery = 'David Hill'  # set winery
        wl_1.grape = 'Chardonnay'  # set grape
        wl_1.year = 2012  # set year
        wl_1.price = 20  # set price
        wl_1.personal_rating = 92  # set personal rating
        wl_1.tasting_notes = "Buttery, oakey, floral. Cantaloupe. Stands well on its own."  # set tasting notes
        wlu.convert_append_array(wlu.all_years, wl_1.year) # append this year to __all_years
        wlu.convert_append_array(wlu.all_prices, wl_1.price)  # GET and append this price to __all_years
        wlu.convert_append_array(wlu.all_ratings, wl_1.personal_rating)  # set personal rating (hard-coded, so does not call wlu.add_ratings as all user input will)
        wlu.add_label(wl_1)  # add this label to all label array

        wl_2 = WineLabel()  # create new instance of WineLabel
        wl_2.region = 'Cold Creek Vinyard, Horse Heaven Hills, Wahluke Slope'  # set region
        wl_2.winery = 'Chateau Ste. Michelle'  # set winery
        wl_2.grape = 'Meritage'  # set grape
        wl_2.year = 2011  # set year
        wl_2.price = 48  # set price
        wl_2.personal_rating = 93 # set personal rating
        wl_2.tasting_notes = "Rich cherry and sharp spice. Long finish."  # set tasting notes
        wlu.convert_append_array(wlu.all_years, wl_2.year) # append this year to __all_years
        wlu.convert_append_array(wlu.all_prices, wl_2.price)  # GET and append this price to __all_years
        wlu.convert_append_array(wlu.all_ratings, wl_2.personal_rating)  # set personal rating (hard-coded, so does not call wlu.add_ratings as all user input will)
        wlu.add_label(wl_2)  # add this label to all label array

        wl_3 = WineLabel()  # create new instance of WineLabel
        wl_3.region = 'Bordeaux'  # set region
        wl_3.winery = 'Medicine Creek Winery'  # set winery
        wl_3.grape = 'Red Blend'  # set grape
        wl_3.year = 2006  # set years
        wl_3.price = 37  # set price
        wl_3.personal_rating = 89  # set personal rating
        wl_3.tasting_notes = "Plum, licorice. Smooth, with tart finish."  # set tasting notes
        wlu.convert_append_array(wlu.all_years, wl_3.year) # append this year to __all_years
        wlu.convert_append_array(wlu.all_prices, wl_3.price)  # GET and append this price to __all_years
        wlu.convert_append_array(wlu.all_ratings, wl_3.personal_rating)  # set personal rating (hard-coded, so does not call wlu.add_ratings as all user input will)
        wlu.add_label(wl_3)  # add this label to all label array

        # set up logic for display of correct page
        if self.request.GET:

            # creating a labeled instance works for now, but I'd obviously need to increment the instance's variable
            wl_4 = WineLabel()  # create new instance of WineLabel
            wl_4.region = self.request.GET['region-name']  # set region
            wl_4.winery = self.request.GET['winery-name']  # set winery
            wl_4.grape = self.request.GET['grape-type']  # set grape
            wl_4.year = self.request.GET['wine-year']  # set year
            wl_4.price = self.request.GET['wine-price']  # set price
            wl_4.personal_rating = wlu.add_ratings(self.request.GET['wine-rating--tens'] + '|' + self.request.GET['wine-rating--ones']) # get tens and ones, concatenate string and separate with pipe
            wl_4.tasting_notes = self.request.GET['wine-notes']  # set tasting notes
            wlu.convert_append_array(wlu.all_years, wl_4.year)  # append this year to __all_years
            wlu.convert_append_array(wlu.all_prices, wl_4.price)  # GET and append this price to __all_years
            wlu.convert_append_array(wlu.all_ratings, wl_4.personal_rating)  # set personal rating through addition in utilities library
            wlu.add_label(wl_4)  # add this label to all label array

            # allows js, css, fonts to be set with instance (for future theming or functionality changes per user / instance)
            results_page = ResultsTemplate()
            results_page.title = 'Wine Label | View Your Labels'  # set page title (useful for per-user theming)
            results_page.description = 'Label your wine library.'  # set page description in head (useful for per-user theming)
            results_page.web_fonts = 'http://fonts.googleapis.com/css?family=Alegreya+Sans:400,700,400italic|Alegreya'  # link web fonts (can't use @font-face in CSS for some reason)
            results_page.css = 'styles/main.css'  # link css
            results_page.script = 'js/main.js'  # link script

            ratings = wlu.average_all_ratings()  # calls method to average all the ratings
            prices = wlu.average_all_prices()  # calls method to average all the prices
            years = wlu.average_all_years()  # calls method to average all the years
            results = wlu.output_labels()  # set variable for result of loop through labels; for results page content
            self.response.write(results_page.format_locals(ratings, prices, years, results))  # set instance of ResultsTemplate to output to page

        else:
            # allows js, css, fonts to be set with instance (for future theming or functionality changes per user / instance)
            form_page = FormTemplate()  # new instance of FormTemplate
            form_page.title = 'Wine Label | Enter Your Labels'  # set page title (useful for per-user theming)
            form_page.description = 'Label your wine library.'  # set page description in head (useful for per-user theming)
            form_page.web_fonts = 'http://fonts.googleapis.com/css?family=Alegreya+Sans:400,700,400italic|Alegreya'  # link web fonts (can't use @font-face in CSS for some reason)  # link web fonts (can't use @font-face in CSS for some reason)
            form_page.css = 'styles/main.css'  # link css
            form_page.script = 'js/main.js'  # link script

            self.response.write(form_page.format_locals())  # call method for outputting HTML

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
