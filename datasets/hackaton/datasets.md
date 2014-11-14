fuente: oficinas_pami.csv (653 registros)
Agencias PAMI (1211).csv (656 registros)

tipo : oficina
sub_tipo : agencia / ugl
codigo: vacio
nombre:
provincia:
codigo_departamento: (vacio)
departamento: (vacio! completar del mapa)
localidad:

direccion_geo:
direccion:
cp:
telefono:

extra_1: actividades
extra_2: prestaciones_medicas
extra_3: responsable
lat:
lon:

---

fuente: BancosDeProtesisINSSJP.csv (38 registros)

tipo : banco de protesis
sub_tipo :
codigo: c_bpl
provincia:d_ugl (sacarlo de esa columna)
codigo_departamento: (vacio)
departamento: (vacio! completar del mapa)
localidad: (vacio! completar del mapa)

nombre: d_bpl
direccion: dir_bpl
cp:
telefono:

extra_1:
extra_2:
extra_3:
lat:
lon:

---
OK!!!

fuente: BocasDeAtencion.csv (22.541 registros)

tipo : boca de atencion
sub_tipo :
codigo: id_prest_boca_atencion
provincia: d_geog_prest_boca_pcia
codigo_departamento: c_geog_prest_boca_dpto
departamento: d_geog_prest_boca_dpto
localidad: d_geog_prest_boca_dpto

nombre: d_prest_boca_atencion
direccion_geo: d_prest_calle + n_prest_puerta
direccion: d_prest_calle + n_prest_puerta + c_prest_piso_depto
cp: c_prest_cp4
telefono:

extra_1: m_prest_habilitado
extra_2:
extra_3:
lat: n_prest_boca_x
lon: n_prest_boca_y

---
OK!

fuente: CentrosdeJubiladosINSSJP.csv (7.434 registros)

tipo : centro de jubilados
sub_tipo :
codigo: nombre
provincia: provincia (ojo, está como numero)
codigo_departamento:
departamento:
partido:
localidad: localidad

nombre: d_prest_boca_atencion
direccion_geo: d_prest_calle + n_prest_puerta
direccion: d_prest_calle + n_prest_puerta + c_prest_piso_depto
cp: c_prest_cp4
telefono:

extra_1: creacion
extra_2: socios
extra_3:  reunion
lat:
lon:

---
OK!

fuente: Farmacias_PAMI_2014_10.csv (13.611)

tipo : farmacias
sub_tipo :
codigo: nombre
provincia: provincia (ojo, está como numero)
codigo_departamento:
departamento:
partido:
localidad: localidad

nombre: d_prest_boca_atencion
direccion_geo: d_prest_calle + n_prest_puerta
direccion: d_prest_calle + n_prest_puerta + c_prest_piso_depto
cp: c_prest_cp4
telefono:

extra_1: creacion
extra_2: socios
extra_3:  reunion
lat:
lon:





