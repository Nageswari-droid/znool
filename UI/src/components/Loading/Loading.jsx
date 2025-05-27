/**
 * Loading component for displaying a full-screen loading indicator.
 *
 * Shows a centered progress bar and label while loading.
 */
import React from "react";
import {
  ProgressLabel,
  ProgressLinear,
  Utility,
  UtilityFragment,
} from "@visa/nova-react";

const id = "indeterminate-linear-progress";

/**
 * Loading component for displaying a full-screen loading indicator.
 * @component
 * @returns {JSX.Element}
 */
const Loading = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgb(215 217 244 / 50%)",
      zIndex: 9999,
      position: "fixed",
      top: 0,
      left: 0,
    }}
    aria-label="Loading"
    role="status"
  >
    <Utility vFlexCol vGap={12} style={{ minWidth: 300 }}>
      <Utility vFlexGrow>
        <UtilityFragment vMarginVertical={8}>
          <ProgressLinear id={id} />
        </UtilityFragment>
        <ProgressLabel htmlFor={id} />
      </Utility>
    </Utility>
  </div>
);

export default Loading;
