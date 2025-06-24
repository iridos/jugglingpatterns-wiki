This repo contains a backup of the wiki pages/files from jugglingpatterns.de to make the it permanently available.

https://www.mediawiki.org/wiki/Manual:Installing_MediaWiki/
https://www.mediawiki.org/wiki/Manual:Restoring_a_wiki_from_backup

Steps to re-assemble:

* debian install with web server php mysql:
apt install apache2 php mariadb

apt install mediawiki-skin-greystuff
* install imagemagick and inkscape for image conversion
without inkscape, svg to png thumb generation will produce garbage
apt install imagemagick inkscape

apt install mediawiki 
git clone https://github.com/iridos/jugglingpatterns-wiki
cp etc_LocalSettings.php /etc/mediawiki/LocalSettings.php
edit /etc/mediawiki/LocalSettings.php and change 
* $wgDBpassword = "secretpassword";
mysql -u root
use mysql;
select user from user;
create USER 'jugglingwiki'@'localhost' IDENTIFIED BY 'secretpassword';
GRANT ALL PRIVILEGES ON my_jugglingwiki.* TO 'jugglingwiki'@'localhost';

also changed from in-repo:
* $wgEmergencyContact  # deprecated, no need to set
* $wgPasswordSender    # belongs to above
* $wgSecretKey         # set to some random string, used internally
* $wgUpgradeKey        # set to some random string

uncomment wfLoadExtension( 'UniversalLanguageSelector' ); or install UniversalLanguageSelector extension

restoring images:
php /usr/share/mediawiki/maintenance/importImages.php images --comment="Importing files from local file repository"  --search-recursively --overwrite
chown -R www-data /var/lib/mediawiki/images/

