import { render, fireEvent } from "@testing-library/react";

import { TaskAdd } from "./TaskAdd";

const addTaskHandler = () => {};
const component = <TaskAdd addTask={addTaskHandler} loading={false} />;
describe("TaskAdd tests", () => {
  test("modal is show when click on plus icon", () => {
    const { getByTestId } = render(component);
    fireEvent.click(getByTestId("addBtn"));
    getByTestId("modal-box").classList.contains("modalShow");
  });

  test("when loading is true spinner is visible", () => {
    const { getByTestId } = render(
      <TaskAdd addTask={addTaskHandler} loading={true} />
    );
    getByTestId("spinner");
  });
});
