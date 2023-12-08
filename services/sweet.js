import Vue from 'vue'

const alerta = (data) => {

    return Vue.swal.fire({
        position:data.posicion || 'bottom',
          toast: true,
          icon: data.tipo,
          title: data.mensaje,
          showConfirmButton: false,
          width: data.largo || 400, 
          timer: data.tiempo || 5000
    })

}

export default alerta