export interface ItemCarrito {
  precio: number;
  cantidad: number;
  descuento?: number;
}

/**
 * Calcula el total a pagar de una lista de productos aplicando descuentos y redondeando a 2 decimales.
 * @param items Lista de productos en el carrito.
 * @returns Total redondeado a 2 decimales.
 * @throws Error con mensaje "Cantidad inválida" si algún producto tiene cantidad negativa.
 */
export function calcularTotal(items: ItemCarrito[]): number {
  const total = items.reduce((acumulado, item) => {
    if (item.cantidad < 0) {
      throw new Error("Cantidad inválida");
    }

    const descuento = item.descuento ?? 0;
    const precioConDescuento = item.precio * (1 - descuento);
    return acumulado + precioConDescuento * item.cantidad;
  }, 0);

  return Math.round((total + Number.EPSILON) * 100) / 100;
}
