import { CSSProperties, createTheme } from "@mantine/core";

const regsiterTheme = createTheme({
  components: {
    Input: {
      styles: {
        input: {
          borderRadius: 1000,
          backgroundColor: "#2F2F2F",
          border: 0,
          color: "#FFF",
          height: 40
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
          backgroundColor: "#FF5A30",
        } as CSSProperties
      }
    }
  },
});

export default regsiterTheme;