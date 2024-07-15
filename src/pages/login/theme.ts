import { CSSProperties, createTheme } from "@mantine/core";

const loginTheme = createTheme({
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
    Button: {
      styles: {
        root: {
          borderRadius: 8,
          backgroundColor: "#FF5A30",
          color: "#FFF",
        } as CSSProperties
      }
    }
  },
});

export default loginTheme;