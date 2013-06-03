System Dependencies
------------------
  - ruby 1.9.3
  - rvm (optional)
  - bundler gem
  

Running the application
-----------------------
    rake serverup


Server folder structure
-----------------------
  - **web** folder: static content (js, html)
  - **groups** folder: groups domain and controller


Front folder structure
----------------------
  - **js/ZZ** : production js files
  - **test**: jasmine tests
  - **vendor**: external dependencies

Testing
-------
    rake -T


Jenkins configuration
-------------------------------------

this is the step that is executed

    bundle
    git checkout master
    git reset --hard
    git pull origin master
    rake serverup &
    xvfb-run --server-args="-screen 0, 1024x768x24" --auto-servernum --server-num=1 rake test:all
    pkill -9 -f rackup
    rake deploy


for deploying to heroku you should have install heroku-toolbelt, grant permissions
for deploying from your machine(ssh key)