# Moneys

## Overview

Find realtime value in JPY(Japanese Yen) from bill image with IBM Watson Visual Recognition.

## Pre-requisite

- [IBM Bluemix](http://bluemix.net/) account

- [IBM Watson Visual Recognition](https://console.bluemix.net/catalog/services/visual-recognition?env_id=ibm:yp:us-south) service instance

- Node.js application server. The one's of IBM Bluemix is best.

## Setup

- Find API Key of your Watson Visual Recognition service.

- Create collection_id with [Watson API Explorer](https://watson-api-explorer.mybluemix.net/).

- Git clone or download from https://github.com/dotnsf/moneys

- Edit settings.js with your API Key and collection_id.

- Run following command for first training:

    - $ node training

- Deploy your application into your Node.js server.

## License

This code is licensed under MIT.

## Reference

http://www2m.biglobe.ne.jp/ZenTech/p03_money.htm

## Copyright

2017 dotnsf@gmail.com all rights reserved.
 



