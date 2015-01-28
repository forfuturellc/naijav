/**
* CI Server publish script
* Copyright (C) 2015  Forfuture LLC <we@forfuture.co.ke>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License along
* with this program; if not, write to the Free Software Foundation, Inc.,
* 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


// npm installed modules
var dropbox = require("dbox");


// script variables
var dboxBotKey = process.env.DBOX_BOT_KEY;
var dboxBotSecret = process.env.DBOX_BOT_SECRET;
var dboxKey = process.env.DBOX_KEY;
var paths = {
  apk: "platforms/android/ant-build/CordovaApp-debug.apk"
};
var bot, naijav;


// We require the API Key(s)
if (! dboxKey || ! dboxBotKey || ! dboxBotSecret) { process.exit(1); }


// Creating the Bot and Client
var bot = dropbox.app({app_key: dboxBotKey, app_secret: dboxBotSecret});
var naijav = bot.client(dboxKey);


// Copying over the Android APK
naijav.cp(paths.apk, "android/naijav.apk", function(status, reply){
  "use strict";
  console.log(status, reply);
});
