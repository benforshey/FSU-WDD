# OWASP - Open Web Application Security Project
## Percetion of Security
Most web applications that we use, we perceive as secure. They're not. HTTP was not 
designed to be secure.

## Injection Attacks
Very serious problem. At the top of the OWASP Top 10. Easy to exploit, common, and can 
be very severe. Basically add SQL to <input> field, causing database to return query 
with sensitive information.

Can't rely on JavaScript validation or POST vs GET to defend from injection attacks. Use 
SQL Parameterized Queries if you're dynamically creating SQL queries in your web app. 
Or, instead of dynamically constructing SQL queries, use stored procedures.

For other languages, or protection against other types of injection attack, use 
encoders. Check out the https://OWASP.org site.

## XSS (Cross-Site Scripting)
Multiple variations, and there's no easy fix. Vulnerability is not tied to a specific 
language, you just need to know a little JavaScript. Where the target of SQL Injection 
is the database server, the target of XSS is other users (usually another user's 
browser). It's another form of an injection attack. 

Can steal Session ID (allowing log into to other accounts (like the "remember me"). Can 
only be stopped by proper whitelisting validation and contextual encoding. 

## HTTP Strict Transport Security (HSTS)
Don't use HTTPS only during login, because the rest of the data needs protection, too. 
Session cookies, other data can be grabbed once HTTPS is downgraded to HTTP. 
Man-in-the-Middle attacks happen when unsecured data is grabbed by a middle point (fake 
WLAN access points, for example). Strict Transport Secuirty disallows downgrading of HTTPS and 
untrusted certificates.
