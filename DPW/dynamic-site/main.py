"""
Ben Forshey
DWP Online
26 Feb 2015
Dynamic Site
"""

import webapp2
from data import ClimbingRopes
from pages import InfoPage
from library import RopeUtilities

class MainHandler(webapp2.RequestHandler):
    def get(self):

        lr = ClimbingRopes()  # instantiate my Data class locally
        lp = InfoPage()  # instantiate my ContentPage class locally
        lu = RopeUtilities()  #instantiate my Library class locally

        # run a word count on the title and description, called through the InfoPage class
        print lp.word_count(lp.title, 50)
        print lp.word_count(lp.description, 150)

        # logic to determine what has been clicked and display correct information
        if self.request.get('milspec'):
            rope = lr.rope_lookup('milspec')  # set local variable to result of method call rope_lookup (which returns an array)
            # set the view equal to the results of the array
            # definitely feel like DRY is being violated here, but I could get local variables to work with me
            lp.view ='''<div id="view">
    <figure>
        <img src="img/milspec.jpg" alt="Milspec 500 Paracord"/>
        <figcaption>By David J. Fred [<a href="http://creativecommons.org/licenses/by-sa/2.5">CC BY-SA 2.5</a> or <a href="http://creativecommons.org/licenses/by-sa/2.5">CC BY-SA 2.5</a>], <a href="http://commons.wikimedia.org/wiki/File%3AParacord-Commercial-Type-III-Coil.jpg">via Wikimedia Commons</a></figcaption>
    </figure>
    <ul id="rope-specs">
        <li><span class="view-rope_title">Name | </span>''' + rope[1] + '''</li>
        <li><span class="view-rope_title">Cost | </span>''' + rope[3] + '''</li>
        <li><span class="view-rope_title">Tensile Strength | </span>''' + str(rope[2]) + '''lbs</li>
        <li><span class="view-rope_title">Weight | </span>''' + lu.weight_per_unit(rope[4], 'ft') + '''</li>
        <li><span class="view-rope_title">Strength to Cost Quotient | </span>''' + rope[5] + '''</li>
    </ul>
</div>
            '''
            self.response.write(lp.format_locals())
        elif self.request.get('kelty'):  # same code as above, different dictionary lookup
            rope = lr.rope_lookup('kelty')
            lp.view ='''<div id="view">
    <figure>
        <img src="img/kelty.jpg" alt="Kelty climbing rope"/>
        <figcaption>Kelty Climbing Rope</figcaption>
    </figure>
    <ul id="rope-specs">
        <li><span class="view-rope_title">Name | </span>''' + rope[1] + '''</li>
        <li><span class="view-rope_title">Cost | </span>''' + rope[3] + '''</li>
        <li><span class="view-rope_title">Tensile Strength | </span>''' + str(rope[2]) + '''lbs</li>
        <li><span class="view-rope_title">Weight | </span>''' + lu.weight_per_unit(rope[4], 'ft') + '''</li>
        <li><span class="view-rope_title">Strength to Cost Quotient | </span>''' + rope[5] + '''</li>
    </ul>
</div>
            '''
            self.response.write(lp.format_locals())
        elif self.request.get('spectra'):  # same code as above, different dictionary lookup
            rope = lr.rope_lookup('spectra')
            lp.view ='''<div id="view">
    <figure>
        <img src="img/spectra.jpg" alt="Spectra climbing rope"/>
        <figcaption>Spectra Climbing Rope</figcaption>
    </figure>
    <ul id="rope-specs">
        <li><span class="view-rope_title">Name | </span>''' + rope[1] + '''</li>
        <li><span class="view-rope_title">Cost | </span>''' + rope[3] + '''</li>
        <li><span class="view-rope_title">Tensile Strength | </span>''' + str(rope[2]) + '''lbs</li>
        <li><span class="view-rope_title">Weight | </span>''' + lu.weight_per_unit(rope[4], 'ft') + '''</li>
        <li><span class="view-rope_title">Strength to Cost Quotient | </span>''' + rope[5] + '''</li>
    </ul>
</div>
            '''
            self.response.write(lp.format_locals())
        elif self.request.get('tether'):  # same code as above, different dictionary lookup
            rope = lr.rope_lookup('tether')
            lp.view ='''<div id="view">
    <figure>
        <img src="img/tether.jpg" alt="Tether climbing rope"/>
        <figcaption>Tether Climbing Rope</figcaption>
    </figure>
    <ul id="rope-specs">
        <li><span class="view-rope_title">Name | </span>''' + rope[1] + '''</li>
        <li><span class="view-rope_title">Cost | </span>''' + rope[3] + '''</li>
        <li><span class="view-rope_title">Tensile Strength | </span>''' + str(rope[2]) + '''lbs</li>
        <li><span class="view-rope_title">Weight | </span>''' + lu.weight_per_unit(rope[4], 'ft') + '''</li>
        <li><span class="view-rope_title">Strength to Cost Quotient | </span>''' + rope[5] + '''</li>
    </ul>
</div>
            '''
            self.response.write(lp.format_locals())
        elif self.request.get('aircore'):  # same code as above, different dictionary lookup
            rope = lr.rope_lookup('aircore')
            lp.view ='''<div id="view">
    <figure>
        <img src="img/aircore.jpg" alt="Aircore climbing rope"/>
        <figcaption>Aircore Climbing Rope</figcaption>
    </figure>
    <ul id="rope-specs">
        <li><span class="view-rope_title">Name | </span>''' + rope[1] + '''</li>
        <li><span class="view-rope_title">Cost | </span>''' + rope[3] + '''</li>
        <li><span class="view-rope_title">Tensile Strength | </span>''' + str(rope[2]) + '''lbs</li>
        <li><span class="view-rope_title">Weight | </span>''' + lu.weight_per_unit(rope[4], 'ft') + '''</li>
        <li><span class="view-rope_title">Strength to Cost Quotient | </span>''' + rope[5] + '''</li>
    </ul>
</div>
            '''
            self.response.write(lp.format_locals())
        else:  # If none of those self.request.get match, display the default view
            lp.view = '''<figure>
    <img src="img/all_ropes.jpg" alt="many climbing ropes in a pile"/>
    <figcaption>Our Rope Storage System</figcaption>
</figure>
<h3>About Our Ropes</h3>
<p>Our ropes are of the finest quality<sup>1</sup> and are available at an unbeatable price<sup>2</sup>. To assist you with your rope selection, Ropes, Inc. offers you this rope library.</p>
<p><sub>(1) Actual ropes may be slightly frayed or once-used.</sub></p>
<p><sub>(2) For competitor's regulary-priced items only.</sub></p>
            '''
            self.response.write(lp.format_locals())

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
