export const Contrato = {
  field1:{
    label:'ID',
    field:'contrato_id',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field2:{
    label:'Fecha Inicio Contrato',
    field:'contrato_fecha_inicio',
    defaultValue:'Sin fecha',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:false,
    isFilterActive: false,
    isRestrictiveFilter:false,
  },
  field3:{
    label:'Horas Semanales',
    field:'contrato_horas_semanales',
    defaultValue:'Sin horas',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field4:{
    label:'Sueldo Base',
    field:'contrato_sueldo_base',
    defaultValue:'Sin sueldo',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
  field5:{
    label:'Valor Hora',
    field:'contrato_valor_hora',
    defaultValue:'Sin valor hora',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },

  field6:{
    label:'Tipo Contrato',
    field:'tipo_contrato', //la relacion en el modelo del backend en laravel
    fieldRelation:'tipo_contrato_nombre',
    defaultValue:'Sin rbd',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },

  field7:{
    label:'Ficha Trabajador',
    field:'ficha_trabajador', //la relacion en el modelo del backend en laravel
    fieldRelation:'ficha_trabajador_id',
    defaultValue:'Sin ficha trabajador',
    searchTextInField:'',
    arrayTextsInSearch:[],
    isVisible:true,
    isFilterActive: false,    
    isRestrictiveFilter:false,
  },
}