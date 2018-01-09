class Page(object):
    def __init__(self):
        self.title = "Welcome!"
        self.css = "css/style.css"
        self.head = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{self.title}</title>
    <link rel="stylesheet" href="{self.css}"
</head>
<body>


        '''
        self.body = "Welcome to my OOP Python page."
        self.close = '''
</body>
</html>
        '''

    def print_out(self):
        concat = self.head + self.body + self.close
        concat = concat.format(**locals())
        return concat
