import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Modal } from "./Modal";

const clickOnBackdrop = jest.fn();
const titleValue = "Test";
const modal = (
  <Modal
    confirmationType={true}
    show={true}
    title={titleValue}
    close={clickOnBackdrop}
  />
);

describe("Modal tests", () => {
  test("class of backdrop and modal-box has changed when component prop show is true", () => {
    const { getByTestId } = render(
      <Modal
        confirmationType={false}
        show={true}
        title={""}
        close={clickOnBackdrop}
      />
    );
    expect(
      getByTestId("modal-backdrop").classList.contains("backdropShow")
    ).toBeTruthy();
    expect(
      getByTestId("modal-box").classList.contains("modalShow")
    ).toBeTruthy();
  });

  test("class of modal-wrapper has chenged when prop confirmationType is true", () => {
    const { getByTestId } = render(modal);
    expect(
      getByTestId("modal-wrapper").classList.contains("modalConf")
    ).toBeTruthy();
  });

  test("function are invoked when click on backdrop and close icon", () => {
    const { getByTestId } = render(modal);
    fireEvent.click(getByTestId("modal-backdrop"));
    fireEvent.click(getByTestId("modal-close"));
    expect(clickOnBackdrop).toHaveBeenCalledTimes(2);
  });

  test("title have correct value", () => {
    const { getByTestId } = render(modal);
    const title = getByTestId("modal-box").firstChild
      ?.firstChild as HTMLElement;
    expect(title.innerHTML).toBe(titleValue);
  });
});
