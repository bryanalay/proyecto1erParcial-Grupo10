const Inventario = {
  InventarioTr: {
    transaction: 'GET_INVENTARIO'
  },
  PostInventario: {
    transaction: 'POST_INVENTARIO'
  },
  DeleteInventario: {
    transaction: 'DELETE_INVENTARIO_BY_ID'
  },
  UpdateInventario: {
    transaction: 'UPDATE_INVENTARIO_BY_ID'
  }
}
const Orden = {
  OrdenTr: {
    transaction: 'GET_ORDENES'
  },
  PostOrden: {
    transaction: 'POST_ORDEN'
  },
  DeleteOrden: {
    transaction: 'DELETE_ORDEN_BY_ID'
  },
  UpdateOrden: {
    transaction: 'UPDATE_ORDEN_BY_ID'
  }
}
const Usuario = {
  Login: {
    transaction: 'USUARIO_LOGIN'
  },
  GetUsuarios: {
    transaction: 'GET_USUARIOS'
  }
}


export const SP = {
  Inventario,
  Orden,
  Usuario
};
