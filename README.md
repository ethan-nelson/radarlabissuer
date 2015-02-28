radarlabissuer
==============
A mock weather warning issue console for a university radar and satellite course.

Built with the Jekyll site generator, which is necessary to generate the site from these files. Under the hood is a mix of jQuery and Javascript. It requires a MySQL database (no GIS extensions necessary) and a PHP webserver.

MySQL attributes are specified in the settings.ini file. Styling is done by Boostrap and Jekyll. A script is found in /scripts to create and setup the necessary MySQL table. An Apache configuration file is also included to prevent outside access to the MySQL settings file.
