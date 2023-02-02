import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe("Pruebas en componente AddCategory", () => {
  test("Debe de cambiar el valor en la caja de texto", () => {
    render(<AddCategory onNewCategory={() => {}} />);
    const input = screen.getByRole("textbox");
    fireEvent.input(input, { target: { value: "Naruto" } });
    expect(input.value).toBe("Naruto");
  });

  test("Debe de llamar onNewCategory si el input tiene un valor", () => {
    const inputValue = "Naruto";
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);
    expect(input.value).toBe("");
    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
  });

  test('No debe de llamar onNewCategory si el input esta vacio', () => { 
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(onNewCategory).not.toHaveBeenCalled();
   })
});
