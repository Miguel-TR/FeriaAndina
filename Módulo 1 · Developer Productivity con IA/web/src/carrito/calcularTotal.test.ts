import { describe, expect, it } from "vitest";
import { calcularTotal } from "./calcularTotal";

describe("calcularTotal", () => {
  it("devuelve cero para un carrito vacío", () => {
    expect(calcularTotal([])).toBe(0);
  });

  it("aplica el descuento al precio", () => {
    expect(calcularTotal([{ precio: 19.99, cantidad: 3, descuento: 0.1 }])).toBe(53.97);
  });

  it("lanza un error si la cantidad es negativa", () => {
    expect(() => calcularTotal([{ precio: 10, cantidad: -1 }])).toThrow(
      new Error("Cantidad inválida"),
    );
  });
});
