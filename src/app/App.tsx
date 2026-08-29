import "../css/App.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { orange } from "@mui/material/colors";


function App() {
  return (
    <Container sx={{background: orange}}>
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on TypeScript with Redux
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
          <Button variant="contained" color={"secondary"}>Contained</Button>
          </RippleBadge>
        </Box>
        
      </Stack>
    </Container>
  );
}

export default App;