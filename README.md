radarlabissuer
==============
A mock weather warning issue console for a university radar and satellite course.

Built with the Jekyll site generator, which is necessary to generate the site from these files. Under the hood is a mix of jQuery and Javascript. It requires a MySQL database (no GIS extensions necessary) and a PHP webserver.

MySQL attributes are specified in the settings.ini file. Styling is done by Boostrap and Jekyll. A script is found in /scripts to create and setup the necessary MySQL table. An Apache configuration file is also included to prevent outside access to the MySQL settings file.

'images/' directory structure
=============================

Based on the default setup, the `images/` directory is user-generated and will contain all of the images for the website--the radar overlays for the map, the map tiles, and the supplementary observation data. The structure is as follows:

```
images/
  obs/
    1kmv/
      ...
    300mb/
      ...
    500mb/
      ...
    700mb/
      ...
    850mb/
      ...
    outlooks/
      ...
    private/
      ...
    radiosondes/
      ...
    shr6/
      ...
    surface/
      ...
    wv/
      ...
    ...
  maptiles/
    *standard map tile setup*
  radar/
    latest.png
    private/
      YYYY-MM-DD-HH-MM.png
      YYYY-MM-DD-HH-MM.png
      ...
```

Since this tool will likely be used during a time evolving event, `private/` directories are used to store files for times that have not yet occurred. Ideally, a script will copy these images to their respective directories as time evolves. Note for the radar layer images that the file should be copied one directory up from `private/` and renamed to `latest.png`. 

Alternatively, if this tool is used to host multiple events, everything can be moved into a subdirectory and respective javascript files changed. (Perhaps in the future, an automated templating system can be implemented.)
