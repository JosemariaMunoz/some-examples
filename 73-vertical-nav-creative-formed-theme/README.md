### Custom 7.3 Theme Based on Liferay's Classic Theme (Evan) + 
### Custom Creative 7.3 B2B commerce enabled theme (Kris) +
### Custom 7.3 Theme with a Vertical Navigation Menu (for a self services portal) and more configuration options.

A simple Liferay theme that allows for easy customization of the color scheme using Style Books.

The theme also has an override of Liferay Clay based on the popular Bootstrap Creative theme and the Minium B2B demo theme for commerce.

The new features for this theme are the possibility to configure a vertical navigation menu (as an example of a self service portal), change the menu colors via Style Books and some capabillities related to show/hidde the vertical navigation menu and/or show/hidde the navigation menu from the header (in case you do not want to use it but you want to keep showing the header).    

### Set Up

1. `npm install`
2. `npm run init`
3. `npm run deploy`

![screenshot](/73-vertical-nav-creative-formed-theme/images/vertical-navigation-theme-screenshot.png)

### Features

* Customizable Header and Footer Colors
* Sticky Header
* Customizable Logo Alignment
* Customizable Form Styles
* Language Selector
* Modal for Login
* Customizable Link Colors
* Show or Hide the Control Menu for logged in Users via the personal menu.
	* This requires an additional module available [here](https://github.com/lfrsales/toggle-control-menu-personal-menu-entry/blob/master/modules/toggle-control-menu-personal-menu-entry/build/libs/com.liferay.users.admin.web.internal.product.navigation.personal.menu.toggle.control.menu-1.0.0.jar).
* Bootstrap Creative theme
* Minium B2B demo theme for commerce
* Show/Hidde the vertical navigation menu
* Customizable vertical navigation menu using Style Books
* Theme settings to show/hidde the vertical navigation menu and/or show/hidde the navigation menu from the header.

Thanks Evan and Kris!