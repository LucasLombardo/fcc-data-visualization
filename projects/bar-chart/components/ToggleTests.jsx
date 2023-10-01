import { useState } from "react";
import { sleep } from "../../../shared/utils";

const ToggleTests = ({ testId }) => {
  const [displayed, setDisplayed] = useState(null);

  const onClick = async () => {
    const previousValue = displayed;
    setDisplayed(!previousValue);
    if (previousValue === null) {
      try {
        await sleep(100);
        const root = document.querySelector(
          "#fcc_test_suite_wrapper"
        ).shadowRoot;
        // expand fcc test menu if not open
        if (!root.querySelector(".fcc_hamburger.transform_top")) {
          root.querySelector("#fcc_toggle").click();
        }
        await sleep(100);
        // select correct test suite
        root.querySelector("#test-suite-selector").value = testId;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <button
        className={`toggle-tests ${displayed ? "active" : ""}`}
        onClick={onClick}
      >
        Toggle FCC Tests {displayed ? "Off" : "On"}
      </button>
      <style>
        {`#fcc_test_suite_wrapper {
            display: ${displayed ? "block" : "none"}
        }`}
      </style>
    </>
  );
};

export default ToggleTests;
