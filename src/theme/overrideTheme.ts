import { CSSProperties, createTheme } from "@mantine/core";

const themeOverride = createTheme({
  components: {
    Input: {
      styles: {
        input: {
          borderRadius: 999,
          backgroundColor: "#414141",
          border: 0,
          color: "#FFF"
        } as CSSProperties
      }
    },
    InputWrapper: {
      styles: {
        root: {
        } as CSSProperties
      }
    },
    Button: {
      styles: {
        root: {
          borderRadius: 8,
          backgroundColor: "#000",
        } as CSSProperties
      }
    }
  },
});

export default themeOverride;