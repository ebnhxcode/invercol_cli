
const checkRelationFilter = {}

checkRelationFilter.install = function (Vue) {
  /*
  * Verifica si el objeto trae relacion desde el backend para setear la variable que corresponde al field a mostrar
  */
  Vue.filter('checkRelationFilter', (field, fieldToReturn) => {
    if (field && typeof(field) === 'object' && typeof fieldToReturn['fieldRelation'] != 'undefined' ) {
      return field[fieldToReturn['fieldRelation']]
    }
    return field
  })
}

export default checkRelationFilter