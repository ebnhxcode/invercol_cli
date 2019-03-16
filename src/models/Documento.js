export const Documento = {
  field1:{
    label:'ID',
    field:'documento_id',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field2:{
    label:'Fecha',
    field:'documento_fecha',
    defaultValue:'Sin fecha',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field3:{
    label:'Fecha Ingreso Documento',
    field:'documento_fecha_ingreso',
    defaultValue:'Sin fecha',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field4:{
    label:'Descripción',
    field:'documento_descripcion',
    defaultValue:'Sin descripción',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field5:{
    label:'Monto',
    field:'documento_monto',
    defaultValue:'Sin descripción',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },

  field6:{
    label:'Número Documento',
    field:'documento_numero',
    defaultValue:'Sin descripción',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },

  field7:{
    label:'Tipo Documento',
    field:'tipo_documento', //la relacion en el modelo del backend en laravel
    fieldRelation:'tipo_documento_nombre',
    defaultValue:'Sin tipo documento',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field8:{
    label:'Rbd',
    field:'rbd', //la relacion en el modelo del backend en laravel
    fieldRelation:'rbd_nombre',
    defaultValue:'Sin rbd',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field9:{
    label:'Proveedor',
    field:'proveedor', //la relacion en el modelo del backend en laravel
    fieldRelation:'proveedor_nombre',
    defaultValue:'Sin proveedor',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field10:{
    label:'Libro',
    field:'libro', //la relacion en el modelo del backend en laravel
    fieldRelation:'libro_nombre',
    defaultValue:'Sin libro',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
}