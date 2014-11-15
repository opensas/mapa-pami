Pami presente
=============

Aplicación de ejemplo hecha en el (Hackaton Pami)[https://it.pami.org.ar/hackathon/]

Mapa interactivo con la información geolocalizada de:

- Oficinas del pami
- Farmacias
- Centros de jubilados
- Bocas de Atención
- Bancos de prótesis

Podés ver la aplicación corriendo en http://opensas.github.io/mapa-pami

Además visualizaciones hechas con CartoDB y cruzando la información con la información estadística del censo nacional de 2010 del INDEC acerca de personas en edad de jubilarse.

Visualizaciones
===============

Centros de jubilados por fecha de creación
http://cdb.io/1sRwyIi

UGLs y Oficinas del PAMI
http://cdb.io/1pyMmBA

Densidad de oficinas del PAMI
http://cdb.io/1pyMKjB

Oficinas del PAMI agrupadas
http://cdb.io/1pyN1CY

Oficinas del PAMI por fecha de creación
http://cdb.io/YhFZIT

El web service está disponible en:
http://opensas.cartodb.com/api/v2/sql?q=select * from oficinas_pami limit 10

Fuente de la información
========================

La información fue obtenida del (portal de datos del PAMI)[https://it.pami.org.ar/?q=dataset].
La información de las oficinas fue extraida de la (página del PAMI)[http://institucional.pami.org.ar/result.php?c=3-7] utilizando OpenRefine.
