const verificaRelacion = {}

verificaRelacion.install = function (Vue) {
  /*
  * Verifica si el objeto trae relacion desde el backend para setear la variable que corresponde al campo a mostrar
  */
  Vue.filter('verificaRelacion', (campo, campoRetorno) => {
    if (campo && typeof(campo) === 'object' && typeof campoRetorno['campoRelacion'] != 'undefined' ) {
      return campo[campoRetorno['campoRelacion']]
    }
    return campo
  })
}

export default verificaRelacion