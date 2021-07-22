import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Input } from "./Input";

const handleChange = jest.fn();
const testedValue = "abc";
const component = (
  <Input edit={true} inputValue={testedValue} onEdit={handleChange} />
);

describe("Input tests", () => {
  test("EDIT button are rendered", () => {
    const { getByText } = render(component);
    getByText("EDIT");
  });

  test("EDIT button are not visible when click on it", async () => {
    const { getByText, queryByText } = render(component);
    fireEvent.click(getByText("EDIT"));
    await waitFor(() => expect(queryByText("EDIT")).toBeNull());
  });

  test("activate input when click on EDIT and have correct value", async () => {
    const testedValue = "abc";
    const { getByLabelText, getByText } = render(component);
    fireEvent.click(getByText("EDIT"));
    const input = getByLabelText("input") as HTMLInputElement;
    await waitFor(() => expect(input.value).toBe(testedValue));
  });

  test("invoked edit function when focus out and value is different from prev value", () => {
    const { getByLabelText, getAllByTestId } = render(component);
    fireEvent.click(getAllByTestId("edit")[0]);
    const input = getByLabelText("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(getAllByTestId("edit")[0]);
    expect(input).toHaveValue("abcd");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("NOT invoked edit function when input focus out and value is not chage", () => {
    const { getAllByTestId } = render(component);
    fireEvent.click(getAllByTestId("edit")[0]);
    fireEvent.click(getAllByTestId("edit")[0]);
    expect(handleChange).toHaveBeenCalledTimes(0);
  });

  test("input have correct value after change", () => {});
});
