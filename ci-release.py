'''
CI Server release script
Copyright (C) 2015 Forfuture LLC <we@forfuture.co.ke>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
'''


import dropbox
import os

DBOX_KEY = os.environ["DBOX_KEY"]
dropbox_bot = dropbox.client.DropboxClient(DBOX_KEY)
paths={
  "android": {
    "local": "platforms/android/ant-build/CordovaApp-debug.apk",
    "dropbox": "/android/android.apk"
  }
}


for target in paths.keys():
  with open(paths[target]["local"], 'rb') as package:
    response = dropbox_bot.put_file(paths[target]["dropbox"], package, overwrite=True)
    print(response)
