import { describe, expect, it } from "vitest";
import { calcularTotal } from "./calcularTotal";

describe("calcularTotal - Casos base", () => {
  it("devuelve 0 para un carrito vacío", () => {
    expect(calcularTotal([])).toBe(0);
  });

  it("calcula el total de un producto con descuento", () => {
    expect(
      calcularTotal([{ precio: 100, cantidad: 1, descuento: 0.15 }]),
    ).toBe(85);
  });

  it("lanza un error con 'Cantidad inválida' si la cantidad es negativa", () => {
    expect(() =>
      calcularTotal([{ precio: 50, cantidad: -1 }]),
    ).toThrow("Cantidad inválida");
  });
});

describe("calcularTotal - Casos borde", () => {
  it("maneja items con cantidad 0 sin sumar al total", () => {
    expect(
      calcularTotal([
        { precio: 100, cantidad: 0 },
        { precio: 50, cantidad: 2 },
      ]),
    ).toBe(100);
  });

  it("maneja descuento de 1 (100% de descuento / producto gratis)", () => {
    expect(
      calcularTotal([{ precio: 250, cantidad: 3, descuento: 1 }]),
    ).toBe(0);
  });

  it("maneja descuento de 0 explícito", () => {
    expect(
      calcularTotal([{ precio: 30, cantidad: 2, descuento: 0 }]),
    ).toBe(60);
  });

  it("maneja productos con precio 0", () => {
    expect(
      calcularTotal([{ precio: 0, cantidad: 10 }]),
    ).toBe(0);
  });

  it("resuelve imprecisiones de punto flotante de JavaScript (ej. sumas tipo 0.1 + 0.2)", () => {
    // 0.1 * 1 + 0.2 * 1 = 0.30000000000000004 en JS
    expect(
      calcularTotal([
        { precio: 0.1, cantidad: 1 },
        { precio: 0.2, cantidad: 1 },
      ]),
    ).toBe(0.3);
  });

  it("redondea correctamente hacia arriba y abajo a 2 decimales", () => {
    // 19.99 * 3 * 0.9 = 53.973 -> redondea a 53.97
    expect(
      calcularTotal([{ precio: 19.99, cantidad: 3, descuento: 0.1 }]),
    ).toBe(53.97);

    // 10.555 -> redondea a 10.56
    expect(
      calcularTotal([{ precio: 10.555, cantidad: 1 }]),
    ).toBe(10.56);
  });

  it("lanza error si la cantidad negativa está en cualquier posición de la lista", () => {
    expect(() =>
      calcularTotal([
        { precio: 10, cantidad: 2 },
        { precio: 20, cantidad: -3 },
        { precio: 30, cantidad: 1 },
      ]),
    ).toThrow("Cantidad inválida");
  });
});
