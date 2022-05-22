// theme
import {ThemeProvider} from "@mui/material";
import {theme} from "./shared/utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      Hello world
    </ThemeProvider>
  );
}

export default App;
