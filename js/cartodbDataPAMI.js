var fetchLocations = function(filter, subtipos, bounds, callback, config) {

  'use strict';

  var filterByBounds = function(bounds) {
    if (!bounds) return '';

    var margin = (bounds.getNorthEast().lat - bounds.getSouthWest().lat) / 5;

    var topLeft = (bounds.getNorthWest().lng - margin) + ' ' + (bounds.getNorthWest().lat + margin);
    var bottomRight = (bounds.getSouthEast().lng + margin) + ' ' + (bounds.getSouthEast().lat - margin);

    var condition = "ST_Within(the_geom, " +
      "ST_Envelope(ST_GeomFromText('LINESTRING( #topLeft#, #bottomRight# )', 4326)))";

    condition = condition
      .replace('#topLeft#', topLeft)
      .replace('#bottomRight#', bottomRight);

    return condition;
  };

  if (!config) throw new Error('cartoDB config not specified');

  var debug = config.debug || false

  filter = (filter || '').toLowerCase();

  subtipos = subtipos || [];

  var fields =
    'tipo, sub_tipo, nombre, ' +  // codigo
    // 'provincia, ' +
    'direccion, cp, telefono, ' +
    'extra1, extra2, extra3, ' +
    'lat, lon'
  ;

  // var fields = 'lat, lon';
  var query = 'select ' + fields + ' from ' + config.table;

  var conditions = [];

  var boundQuery = filterByBounds(bounds);
  if (boundQuery) conditions.push(boundQuery);

  if (filter) {
    var filterQuery =
      "lower(nombre) like '%" + filter + "%' or " +
      "lower(direccion) like '%" + filter + "%'";
    conditions.push(filterQuery);
  };

  var subtiposQuery;

  if (subtipos.length > 0) {
    subtiposQuery = "'" + subtipos.join("', '") + "'";
    subtiposQuery = '( lower(sub_tipo) in (' + subtiposQuery.toLowerCase() + ') )';
    conditions.push(subtiposQuery);
  }

  if (conditions.length > 0) {
    query += ' where (' + conditions.join(') and (') + ')';
  }

  //http://devel.cartodb.com/api/v2/sql?q=select%20*%20from%20cultura%20limit%2020
  if (debug) console.log(query);

  var url = 'http://' + config.user + '.cartodb.com/api/v2/sql?' +
    'q=' + encodeURIComponent(query) +
    (config.apikey ? '&api_key=' + config.apikey : '');

  if (debug) console.log(url);

  $.get(url, function(data) {
    if (debug) console.log('fetched: ' + data.total_rows);
    callback(data);
  });

  return;

};
