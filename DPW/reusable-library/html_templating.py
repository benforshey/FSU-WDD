"""
Ben Forshey
DWP Online
19 Feb 2015
Reusable Library
"""

# parent class that should work for any HTML5 page
class FormTemplate(object):
    # init variables that are required for an HTML5 page
    def __init__(self):
        self.title = ''
        self.description = ''
        self.web_fonts = ''
        self.css = ''
        self.script = ''
        self.html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{self.title}</title>
    <meta name="description" content="{self.description}">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="{self.web_fonts}">
    <link rel="stylesheet" href="{self.css}">
</head>
<body>
    <header>
        <h1>Enter Your Wine Label</h1>
        <p>Wine Library lets you quickly keep important notes on your favorite wines. Enter your labels and notes and we'll keep track of all the important statistics.</p>
    </header>
    <div class="form-container">
        <form id="wine-form" method="GET">
            <div class="form-block">
                <label class="label-block" for="region-name">What Region? <span class="label-required">(required)</span></label>
                <input type="text" id="region-name" name="region-name" required="true">
                <span class="helper-text">What region(s) did the grapes come from?</span>
            </div>
            <div class="form-block">
                <label class="label-block" for="winery-name">What Winery? <span class="label-required">(required)</span></label>
                <input type="text" id="winery-name" name="winery-name" required="true">
                <span class="helper-text">Who is the winemaker on the label?</span>
            </div>
            <div class="form-block">
                <label class="label-block" for="grape-type">What Grape? <span class="label-required">(required)</span></label>
                <input type="text" id="grape-type" name="grape-type" placeholder="Cabernet Sauvignon" required="true">
                <span class="helper-text">Riesling, Chardonnay, Merlot, Tempranillo, etc.</span>
            </div>
            <div class="form-block">
                <label class="label-block" for="wine-year">What Year? <span class="label-required">(required)</span></label>
                <input type="number" id="wine-year" name="wine-year" placeholder="2000" required="true">
                <span class="helper-text">What year was this wine bottled?</span>
            </div>
            <div class="form-block">
                <label class="label-block" for="wine-price">What Price? <span class="label-required">(required)</span></label>
                <input type="number" id="wine-price" name="wine-price" placeholder="28.35" required="true">
                <span class="helper-text">What price did you pay for this bottle?</span>
            </div>
            <div class="form-block slider-block">
                <span class="label-block">Your Rating: <span class="label--range-math" id="range-math-total"> 55</span></span>
                <span class="label--range-math" id="range-math-subtotal--tens">50</span>
                <input type="range" min="0" max="100" step="10" value="50" id="wine-rating--tens" name="wine-rating--tens">
                <span class="label--range-math" id="range-math-subtotal--ones">5</span>
                <input type="range" min="0" max="10" step="1" value="5" id="wine-rating--ones" name="wine-rating--ones">
                <span class="helper-text">How would you rate this bottle (from 1 to 100)?</span>
            </div>
            <div class="form-block">
                <label class="label-block" for="wine-notes">Your Tasting Notes:</label>
                <textarea name="wine-notes" id="wine-notes"></textarea>
                <span class="helper-text">Describe the experience that this wine gave.</span>
            </div>
            <div class="form-block" id="submit-block">

            </div>
        </form>
    </div>
    <script src="{self.script}"></script>
</body>
</html>
        '''
    # set formatting for local variables (just looks cleaner to me) and return for use
    def format_locals(self):
        html = self.html_content
        html = html.format(**locals())
        return html

class ResultsTemplate(object):
    # init variables that are required for an HTML5 page
    def __init__(self):
        self.title = ''
        self.description = ''
        self.web_fonts = ''
        self.css = ''
        self.script = ''
        self.average_rating = ''
        self.average_price = ''
        self.average_year = ''
        self.body_content = ''
        self.html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{self.title}</title>
    <meta name="description" content="{self.description}">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="{self.web_fonts}">
    <link rel="stylesheet" href="{self.css}">
</head>
<body>
    <header>
        <h1>Your Wine Library</h1>
        <p>Your Wine Library has an average rating of <span class="wine-library-summary">{self.average_rating}</span> points, with an average price per bottle of <span class="wine-library-summary">{self.average_price}</span>. The average wine in your library was bottled in <span class="wine-library-summary">{self.average_year}</span>.</p>
    </header>
    <div class="results-container">
        {self.body_content}
    </div>
    <script src="{self.script}"></script>
</body>
</html>
        '''
    # set formatting for local variables (just looks cleaner to me) and return for use
    def format_locals(self, rating, price, year, result):
        self.average_rating = rating
        self.average_price = price
        self.average_year = year
        self.body_content = result
        html = self.html_content.format(**locals())
        return html