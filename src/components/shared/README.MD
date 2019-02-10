## Para componentes como header board, son reutilizables para cualquier tabla que funcione con complemento con el modelo , los campos actuales que requiere la tabla son:

## Ejemplo el de hotel

/*
* Se registra solo lo que se usa para el desarrollo
* en este modelo se registran las propiedades de cada campo que se utilizan para alguna funcion en particular dentro del dom
* existen propiedades requeridas que pueden ser seteadas por defecto con la configuracion actual o alguna en particular
* pero las que se encuentran seteadas ahora pueden tener un comportamiento distinto al modificar sin entender para qué funcionan
* se recomienda ir leyendo la documentacion en cada seccion
*/
const hotelModel = {
   id_hotel:{
      etiqueta:'Id',
      campo:'id_hotel',
      visible:true,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   hot_nombre:{
      etiqueta:'Nombre',
      campo:'hot_nombre',
      visible:true,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   hot_direccion:{
      etiqueta:'Dirección',
      campo:'hot_direccion',
      visible:false,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   comuna:{
      etiqueta:'Comuna',
      campo:'comuna',
      campoRelacion:'com_nombre',
      visible:true,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   ciudad:{
      etiqueta:'Ciudad',
      campo:'ciudad',
      campoRelacion:'ciu_nombre',
      visible:true,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   cat:{
      etiqueta:'Categoría',
      campo:'cat',
      campoRelacion:'cat_nombre',
      visible:true,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   estado:{
      etiqueta:'Estado',
      campo:'estado',
      visible:false,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   hot_fono:{
      etiqueta:'Fono',
      campo:'hot_fono',
      visible:false,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
   hot_email:{
      etiqueta:'E-mail',
      campo:'hot_email',
      visible:false,
      filtroActivo: false,
      textoBusquedaEnCampo:'',
      textosEnBusqueda:[],
      filtroRestrictivo:false,
   },
}

export default hotelModel