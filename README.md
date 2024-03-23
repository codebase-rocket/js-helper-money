# Money Library #

Handles money calculations for known currencies


**************************************************


Internal Keys Glossary
----------------------
* sym: Currency Symbol (Ex: ₹, $),
* dec: Decimals in Currency Value(Ex: 2 in USD, 8 in Bitcoin)
* tarf: Transactional Amount Roundoff Factor (Ex: INR can be rounded off by 1)


Create a Personal Access Token
------------------------------
* Go to your GitHub account settings, find Developer settings -> Personal access tokens.
* Generate a new token with the write:packages and delete:packages scope. You will use this token as the password to authenticate to GitHub Packages.


Add your token as a repository secret
-------------------------------------
* Go to your GitHub repository, then "Settings" -> "Secrets" -> "New repository secret".
* Add your token as a secret named GH_TOKEN.
