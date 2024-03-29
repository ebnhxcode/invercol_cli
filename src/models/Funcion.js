export const Funcion = {
  field1:{
    label:'ID',
    field:'funcion_id',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field2:{
    label:'Código',
    field:'funcion_codigo',
    defaultValue:'Sin código',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field3:{
    label:'Nombre',
    field:'funcion_nombre',
    defaultValue:'Sin nombre',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field4:{
    label:'Descripción',
    field:'funcion_descripcion',
    defaultValue:'Sin descripción',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field5:{
    label:'Tipo Función',
    field:'tipo_funcion', //la relacion en el modelo del backend en laravel
    fieldRelation:'tipo_funcion_nombre',
    defaultValue:'Sin tipo documento',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
}