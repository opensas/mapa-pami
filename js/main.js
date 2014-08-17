$(function() {

  // cartoDB configuration
  var config = {
    user: 'opensas',
    table: 'oficinas_pami',
    debug: true
  };

   // add an OpenStreetMap tile layer
  var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });

   // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map', {
    center: [-34.624874, -58.427166],
    zoom: 12,
    layers: tileLayer,
    attributionControl: false
  });

  renderAddresses = function() {

    var filtro = $('#search').val() || '';

    var tipos = _.map($('.tipo_check.todo-done'), function(item) {
      return $(item).attr('data-tipo');
    });

    var actividades = _.map($('.actividad_check.todo-done'), function(item) {
      return $(item).attr('data-actividad').split(',');
    });
    actividades = _.flatten(actividades);

    var cluster = $('li.clusterMarkers div.switch div').hasClass('switch-on');

    map.spin(true);
    fetchLocations(filtro, tipos, actividades, map.getBounds(), function(data) {
      map.spin(false);

      map.renderAddresses(data.rows, filtro, actividades, cluster);

    }, config);
  }

  map.updateCluster = function() {
    var filtro = $('#search').val() || '';
    var cluster = $('li.clusterMarkers div.switch div').hasClass('switch-on');
    var actividades = _.map($('.actividad_check.todo-done'), function(item) {
      return $(item).attr('data-actividad').split(',');
    });
    actividades = _.flatten(actividades);

    map.spin(true);
    // allow dom to repaint,
    // see http://stackoverflow.com/a/4005365, http://stackoverflow.com/a/12022571
    window.setTimeout(function() {
      map.renderAddresses(map.data, filtro, actividades, cluster);
      map.spin(false);
    }, 50);
  };

   // add a method to my map to render every address
  map.renderAddresses = function(addresses, filtro, actividades, cluster) {
    console.log('rendering ' + addresses.length + ' addresses');

    if (map.addresses) map.addresses.clearLayers();
    map.addresses = cluster ? new L.MarkerClusterGroup() : new L.LayerGroup();
    map.addLayer(map.addresses);

    // save a copy of the data
    // so that I can rerender without reading from the web service
    map.data = addresses;

    var formatUrl = function(url) {
      return url.substr(0, 7) === 'http://' ? url : 'http://' + url;
    };

    var formatUrlText = function(url) {
      return url.substr(0, 7) === 'http://' ? url.substr(7) : url;
    };

    var formatFiltro = function(value, filtro) {
      if (!filtro) return value;
      var regExp = new RegExp('(.*)(' + filtro + ')(.*)', 'ig');
      var matches = regExp.exec(value);
      if (!matches) return value;
      return matches[1] + '<span class="filtro">' + matches[2] + '</span>' + matches[3];
    };

    var filtroActividades = function(value, actividades) {
      actividades.forEach(function(actividad) {
        value = formatFiltro(value, actividad);
      });
      return value;
    };

    var color,
      defaultColor = 'yellow',
      colors = {
        'ugl': 'red',
        'agencia': 'green'
      },
      icon,
      defaultIcon = 'tint',
      icons = {
        'ugl': 'hospital',
        'agencia': 'user-md'
      };

    // optimize loop -> http://stackoverflow.com/a/1340634/47633
    var location,
      counter = addresses.length;

    // map.spin(true);

    while (counter--) {
      location = addresses[counter];

      // blue, green, orange, yellow, purple, and violet
      color = colors[location.tipo] || defaultColor;
      icon = icons[location.tipo] || defaultIcon;

      try {

        var message =
          '<b>' + (location.tipo ===  'ugl' ?
            'UGL: '     + formatFiltro(location.ugl, filtro) :
            'Agencia: ' + formatFiltro(location.agencia, filtro)
          ) + '</b></br>' +
          (location.direccion ?
            '<b>' + formatFiltro(location.direccion, filtro) + '</b></br>' : ''
          ) +
          (location.telefono ? '<b>Tel</b>: ' + location.telefono + '</br>' : '') +
          (location.fax ? '<b>Fax</b>: ' + location.fax + '</br>' : '') +
          (location.pami_escucha ? '<b>Pami escucha</b>: ' + location.pami_escucha + '</br>' : '') +
          (location.actividades ? '<b>Actividades</b>: ' +
            filtroActividades(location.actividades, actividades) + '</br>' : ''
          ) +
          (location.prestaciones_medicas ? '<b>Prestaciones</b>: ' + location.prestaciones_medicas + '</br>' : '') +
          (location.responsable ? '<b>Responsable</b>: ' + location.responsable + '</br>' : '');

        var marker = L.marker([location.lat, location.lon], {
          icon: L.AwesomeMarkers.icon({
            icon: icon,
            color: color
          })
        }).bindPopup(message);

        map.addresses.addLayer(marker);

      } catch (e) {
        console.log('could not create marker');
        console.log(location);
      }

    }
    return this;
  };

  $('#search').on('input', _.debounce(function(e) {
    renderAddresses();
  }, 800));

  $('.clusterMarkers').on('click', function(e) {
    // give time for switch plugin to change the value of the checkbox
    window.setTimeout(function() {
      map.updateCluster();
    }, 100);
  });

  $('.tipo_check').on('click', function(e) {
    $(e.currentTarget).toggleClass('todo-done');
    renderAddresses();
  });

  $('.actividad_check').on('click', function(e) {
    $(e.currentTarget).toggleClass('todo-done');
    renderAddresses();
  });

  $(function() {
    renderAddresses();
  });

  map.lastZoom = map.getZoom();
  map.on('moveend', function() {
    // me acerqué, no traigo nuevos puntos
    if (map.getZoom() > map.lastZoom) {
      map.lastZoom = map.getZoom();
      return;
    }
    renderAddresses();
    map.lastZoom = map.getZoom();
  });

});
