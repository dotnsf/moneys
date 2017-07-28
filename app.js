//. app.js
var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    cfenv = require( 'cfenv' ),
    //http = require( 'http' ),
    client = require( 'cheerio-httpcli' ),
    multer = require( 'multer' ),
    easyimg = require( 'easyimage' ),
    fs = require( 'fs' ),
    watson = require( 'watson-developer-cloud' ),
    app = express();
var settings = require( './settings' );
var vr3 = watson.visual_recognition({
  api_key: settings.vr_api_key,
  version: 'v3',
  version_date: '2016-05-19'
});
var appEnv = cfenv.getAppEnv();

app.use( multer( { dest: './uploads/' } ).single( 'img' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

app.get( '/convert', function( req, res ){
  var from = req.query.from;
  if( from ){
    if( from == 'CHY' ) from = 'CNY';

    var to = req.query.to || 'JPY';
    var url = 'https://www.google.com/finance/converter?a=1&from=' + from + '&to=' + to;
    var r = null;
    client.fetch( url, {}, function( err, $, res0 ){
      $('.bld').each( function(){
        stmp = $(this).text().split( ' ' );
        r = stmp[0];
        res.write( r );
        res.end();
      });
    });
  }else{
    res.write( "No from currency." );
    res.end();
  }
});

app.post( '/upload', function( req, res ){
  //console.log( req.file );

  //. resize
  var srcpath = req.file.path;
  var dstpath = req.file.path + req.file.originalname;
  var settingObj = {
    format: 'png',
    src: srcpath,
    dst: dstpath,
    width: 600
  };
  easyimg.resize( settingObj ).then( function( image ){
    var params = {
      collection_id: settings.vr_collection_id,
      limit: 1,
      image_file: fs.createReadStream( dstpath )
    };

    var req1 = vr3.findSimilar( params,
      function( err1, res1 ){
        fs.unlink( srcpath, function( err ){} );
        fs.unlink( dstpath, function( err ){} );

        if( err1 ){
          console.log( err1 );
        }else{
          var p = JSON.stringify( res1, null, 2 );
          res.writeHead( 200, { 'Content-Type': 'text/plain' } );
          res.write( p );
          res.end();
        }
      }
    );
  });
});

app.listen( appEnv.port );
console.log( "server starting on " + appEnv.port + " ..." );


