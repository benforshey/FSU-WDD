'''
name
class
date
assignment name
'''

import webapp2  # use the webapp2 library


class MainHandler(webapp2.RequestHandler):  # declaring a class
    def get(self):  # starts everything
        page_head = '''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        '''
        page_body = '''
        <body>
            <form action="" method="GET">
                <label for="">Name: </label>
                <input type="text" name="user">
                <label for="">Email: </label>
                <input type="text" name="email">
                <button type="submit">Submit</button>
            </form>
        '''
        page_links = '''
        <a href="?user=Ben&email=ben@you.com">Click here if you are Ben</a><br>
        <a href="?user=Susi&email=susi@you.com">Click here if you are Susi</a><br>
        <a href="?user=Violet&email=violet@you.com">Click here if you are Violet</a><br>
        '''
        page_close = '''
        </body>
        </html>
        '''
        if self.request.GET:
            user =  self.request.GET['user']
            email = self.request.GET['email']

            self.response.write(page_head + user + ' ' + email + ' ' + page_body + page_links + page_close)
        else:
            self.response.write(page_head + page_body + page_close)


app = webapp2.WSGIApplication([  # calling a method of webapp2; not for editing
    ('/', MainHandler)
], debug=True)
