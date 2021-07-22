import { render, waitFor } from "@testing-library/react";

import mockApi from "../../services/tasksApi";
import { TodoList } from "./TodoList";

jest.mock("../../services/tasksApi");

const testedList = [
  {
    id: 1,
    taskName: "Go to cinema",
    taskTime: "2021-06-12T19:30",
    taskDesc: "",
  },
  {
    id: 2,
    taskName: "Wash car",
    taskTime: "2021-06-15T19:30",
    taskDesc: "",
  },
];

describe("TodoList test", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("show spinner when api is not avalible", () => {
    mockApi.get = jest.fn().mockResolvedValueOnce(null);
    const { getAllByTestId } = render(<TodoList />);
    getAllByTestId("spinner");
    expect(mockApi.get).toBeCalledTimes(1);
  });

  test("Show 'Empty' message when list of tasks is empty", async () => {
    mockApi.get = jest.fn().mockResolvedValueOnce([]);
    const { getAllByText } = render(<TodoList />);
    await waitFor(() => getAllByText("Empty task list."));
    expect(mockApi.get).toBeCalledTimes(1);
  });

  test("display correct data in task list", async () => {
    mockApi.get = jest.fn().mockResolvedValueOnce(testedList);
    const { getByText, getAllByTestId } = render(<TodoList />);
    await waitFor(() => getAllByTestId("tasks-list"));
    await waitFor(() => getByText(testedList[0].taskName));
    expect(mockApi.get).toBeCalledTimes(1);
  });
});
