class PageTemplate(object):

    # initialize the class
    # included arguments in function call in case I wanted to put varaibles directly into an instance; not sure if wise
    def __init__(self, title, description, web_fonts, css, script, body_content, skeleton):
        # set variables for common elements that might need be abstracted
        self.title = title
        self.description = description
        self.web_fonts = web_fonts
        self.css = css
        self.script = script
        self.body_content = body_content
        self.skeleton = skeleton

    # function to format text for local variables (makes templating easier)
    def prepare_template(self):
        page = self.skeleton
        page = page.format(**locals())
        return page


# new class (more specific) inheriting from PageTemplate
class CardTemplate(PageTemplate):

    # initialize and set variables to appropriate content
    def __init__(self):
        self.title = "Practice Gratitude | Write a Thank You Note"
        self.description = "Write and send your free thank you note today."
        self.web_fonts = "http://fonts.googleapis.com/css?family=Source+Sans+Pro|Arvo|Josefin+Sans:400+700|Josefin+Slab:400+700|Merriweather|Raleway"
        self.css = "css/main.css"
        self.script = "js/min/main-min.js"
        # main content of HTML
        self.body_content = '''<header>
    <h1>Send a Thank You Note!</h1>
    <p>Practice gratitude often and make the world a better place. Send a thank you note through this free service.</p>
</header>
<div class="form-container">
    <form method="GET">
        <div class="form-block">
            <label class="label-block" for="sender-name">What is your name?</label>
            <input type="text" id="sender-name" name="sender-name" required>
            <span class="helper-text">I use this only to address you once you send your message.</span>
        </div>
        <div class="form-block">
            <label class="label-block" for="sender-email">What is your email address?</label>
            <input type="email" id="sender-email" name="sender-email" placeholder="sender@example.com" required>
            <span class="helper-text">I'll only use this to confirm that the note was sent<span id="text-to-toggle" class="visuallyHidden"> and to confirm that the note was read</span>.</span>
        </div>
        <div id="manage-receipt-text" class="form-block">
            <span class="radio-label">Would you like notification when your note has been <b>read?</b></span>
            <div class="radio-block">
                <input type="radio" id="confirm-receipt--answer-yes" name="confirm-receipt" value="yes">
                <label for="confirm-receipt--answer-yes">yes</label>
                <input type="radio" id="confirm-receipt--answer-no" name="confirm-receipt" value="no" checked>
                <label for="confirm-receipt--answer-no">no</label>
            </div>
        </div>
        <div class="form-block">
            <label class="label-block" for="recipient-email">What email address should I send this to?</label>
            <input type="email" id="recipient-email" name="recipient-email" placeholder="recipient@example.com" required>
        </div>
        <!-- contemplating adding client-side honeypot, but will work on core elements first -->
        <!-- <div class="altMessage">
            <label for="altMessage">Alternate Message</label>
            <input type="text" id="altMessage">
        </div> -->
        <div class="form-block">
            <label class="label-block" for="sender-message">What would you like to say?</label>
            <textarea class="sender-message" id="sender-message" name="sender-message" required placeholder="John, thanks for coming over to bring my family a meal when we were down the with stomach flu. Your friendship means so much to me and my family."></textarea>
        </div>
        <div class="form-block">
            <label for="message-font">What font looks best for your note?</label>
            <!-- it looks like select text is styled by the OS, rather than by the CSS; leaving the span and class for now -->
            <select id="message-font" name="message-font">
                <option value="Source Sans Pro"><span class="is-font-1">Source Sans Pro</span></option>
                <option value="Josefin Sans" selected><span class="is-font-2">Josefin Sans</span></option>
                <option value="Raleway"><span class="is-font-3">Raleway</span></option>
                <option value="Arvo"><span class="is-font-4">Arvo</span></option>
                <option value="Josefin Slab"><span class="is-font-5">Josefin Slab</span></option>
                <option value="Merriweather"><span class="is-font-6">Merriweather</span></option>
            </select>
        </div>
        <div class="form-status">
        </div>
        <div class="form-block">
            <button type="submit" class="form-button--submit">Send Your Note</button>
        </div>
    </form>
</div>
        '''
        # basic template every page will likely need; tried including in master class, but would not inherit
        # couldn't figure out why; placing in parent class then calling self.skeleton would always throw an error for the attribute not existing
        self.skeleton = '''<!DOCTYPE html>
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
    {self.body_content}
    <script src="{self.script}"></script>
</body>
</html>
        '''


# new class (more specific) inheriting from PageTemplate
# differs in that skeleton includes body content, because local variables must be passed into both skeleton and body content in this instance
class CardResults(PageTemplate):
    def __init__(self):
        self.title = "View Results | View Your Thank You Note"
        self.description = "Write and send your free thank you note today."
        self.web_fonts = "http://fonts.googleapis.com/css?family=Source+Sans+Pro|Arvo|Josefin+Sans:400+700|Josefin+Slab:400+700|Merriweather|Raleway"
        self.css = "css/main.css"
        self.script = "js/min/main-min.js"
        # set the enitre page's HTML; use local variables to fill in abstracted elements
        self.skeleton = '''<!DOCTYPE html>
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
        <h1>Confirmation of Service</h1>
        <p>You practiced gratitude&mdash;well done! If you enjoyed this free service, please pass it along.</p>
    </header>
    <div class="results-container">
        <p>Your confirmation email was sent to {sender_email} with the following details:</p>
        <p>{sender_name} sent an Thank You Note to {recipient_email}.</p>
        <p>You {confirm_receipt} receive a notification when your note is opened.</p>
        <p>Your message, using the font {message_font}, was as follows:</p>
        <div class="sent-message-container">
            <p>{sender_message}</p>
        </div>
    </div>
    <script src="{self.script}"></script>
</body>
</html>
        '''
    # like prepare_template method in parent class, but with some logic and passing of GET varaiables from MainHandler
    def prepare_template_GET(self, sender_email, sender_name, recipient_email, confirm_receipt, message_font, sender_message):
        # set variables passed in from GET request in MainHandler to be used in local formatting
        # very confused, but def functions just fine without storing the variables anywhere (obviously except the one I need for the conditional statement)
        # am pretty sure that in JS I would have needed to store these vars locally in this function in order to pass them elsewhere
        # python just seems to hold on to them and use them in the *.format(**locals()) below

        # self.sender_email = sender_email
        # self.sender_name = sender_name
        # self.recipient_email = recipient_email
        self.confirm_receipt = confirm_receipt
        # self.message_font = message_font
        # self.sender_message = sender_message

        # format text response for yes/no on confirm-receipt (just makes for better grammar)
        # also has a failsafe in the impossible case that the value is something other than "yes" or "no"
        if self.confirm_receipt == "yes":
            confirm_receipt = "will"
        elif self.confirm_receipt == "no":
            confirm_receipt = "will not"
        else:
            self.confirm_receipt = confirm_receipt

        # format and return the page when the method is called
        page = self.skeleton
        page = page.format(**locals())
        return page
