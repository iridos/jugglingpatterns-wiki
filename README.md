This repo contains a backup of the wiki pages/files from jugglingpatterns.de to make the it permanently available.

https://www.mediawiki.org/wiki/Manual:Installing_MediaWiki/

Steps to re-assemble:

* debian install with web server php mysql 
apt install mediawiki-skin-greystuff

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

