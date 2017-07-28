//. training.js
var http = require( 'http' ),
    fs = require( 'fs' ),
    watson = require( 'watson-developer-cloud' );
var settings = require( './settings' );
var vr3 = watson.visual_recognition({
  api_key: settings.vr_api_key,
  version: 'v3',
  version_date: '2016-05-19'
});
var collection_id = settings.vr_collection_id;

fs.readdir( './public/imgs', function( err, files ){
  if( err ) throw err;

  files.forEach( function( file ){
    //console.log( file );
    var tmp1 = file.split( '.' );
    var tmp2 = tmp1[0].split( '-' );
    if( tmp2.length > 1 ){ //. (XXX-nnnC.***) というファイル名称になっていることを確認してから実行する
      var currency = tmp2[0]; //. XXX
      var unit = tmp2[1].substring( 0, tmp2[1].length - 1 ); //. nnn

      //. metadata
      var metadatajson = "{\"filename\":\"" + file + "\", \"currency\":\"" + currency + "\", \"unit\": " + unit + "}";

      //. addImage
      var params = {
        collection_id: collection_id,
        metadata: JSON.parse( metadatajson ),
        image_file: fs.createReadStream( './public/imgs/' + file )
      };

      vr3.addImage( params, function( err1, res1 ){
        console.log( res1 );
      });
    }
  });
});

