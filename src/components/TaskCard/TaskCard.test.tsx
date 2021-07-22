import { fireEvent, render } from "@testing-library/react";

import { initialTask } from "../../utils/helperMethod";
import { TaskCard } from "./TaskCard";

const closeTaskCard = jest.fn();
const removeTaskHandler = jest.fn();
const editTaskHandler = jest.fn();
describe("TaskCard tests", () => {
  test("show spinner when prop loading is true", () => {
    const { getByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={true}
      />
    );

    getByTestId("spinner");
  });

  test("show inputs when prop show is true", () => {
    const { getByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={false}
      />
    );

    getByTestId("main-modal-inputs");
  });

  test("when taskDesc is empty description have another value", () => {
    const { queryAllByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={false}
      />
    );
    const description =
      queryAllByTestId("modal-box")[0].querySelectorAll("p")[2].innerHTML;
    expect(description).toBe("Description:");
  });

  test("it inputs is equal to task prop object", () => {
    initialTask.taskDesc = "A";
    const { queryAllByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={false}
      />
    );
    const paragraphs = queryAllByTestId("modal-box")[0].querySelectorAll("p");
    const title = paragraphs[0].innerHTML;
    expect(title).toBe(initialTask.taskName);
    const time = paragraphs[1].innerHTML;
    expect(time).toBe(initialTask.taskTime);
    const desc = paragraphs[2].innerHTML;
    expect(desc).toBe(initialTask.taskDesc);
  });

  test("open modal when click on complete", async () => {
    initialTask.taskDesc = "A";
    const { getByText, queryAllByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={false}
      />
    );
    const button = getByText("Complete");
    fireEvent.click(button);
    queryAllByTestId("modal-box")[1].classList.contains("modalShow");
  });

  test("close modal when click", async () => {
    initialTask.taskDesc = "A";
    const { getByText, queryAllByTestId } = render(
      <TaskCard
        task={initialTask}
        show={true}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={false}
      />
    );
    const button = getByText("Complete");
    fireEvent.click(button);
    queryAllByTestId("modal-box")[1].classList.contains("modalShow");
  });
});
