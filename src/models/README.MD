# Modelos

Se registra solo lo que se usa para el desarrollo
en este modelo se registran las propiedades de cada campo que se utilizan para alguna funcion en particular dentro del dom
existen propiedades requeridas que pueden ser seteadas por defecto con la configuracion actual o alguna en particular
pero las que se encuentran seteadas ahora pueden tener un comportamiento distinto al modificar sin entender para qué funcionan
se recomienda ir leyendo la documentacion en cada seccion

Solo se agregan las propiedades que tienen que ver con la funcionalidad del sistema

Detalle de las propiedades:

- label: se usa para mostrar el nombre del campo, ya sea en una cabecera de tabla, en un boton, etc
- field: se usa para funcionalidades relacionadas a objectos e interoperabilidad con los modelos, conexiones, bd, etc
- fieldRelacion: se usa cuando el objecto tiene una relacion y este campo permite traer una propiedad o campo a visualizar de esa relacion
- isVisible: se usa para mostrar el campo donde se instanció el modelo
- isFilterActive: se usa para mostrar el filtro del campo en la tabla
- searchTextInField: se usa como v-model para hacer el bind del texto y guardarlo como tag en la tabla
- arrayTextsInSearch: se usa para almacenar los textos de referencia (tags) en la tabla
- isRestrictiveFilter: se usa para restringir la busqueda en la tabla solo para ese tag
