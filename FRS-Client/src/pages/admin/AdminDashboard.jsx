import * as React from "react";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  PageContainer,
  PageContainerToolbar,
} from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card"; 
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

// const NAVIGATION = [
//   {
//     segment: 'orders',
//     title: 'Orders',
//     icon: <DashboardIcon />,
//   },
// ];

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  padding: "10px",
  content: '" "',
}));

// function PageToolbar() {
//   return (
//     <PageContainerToolbar>
//       <Stack direction="row" spacing={1} alignItems="center">
//         <Button
//           variant="outlined"
//           size="small"
//           color="neutral"
//           startIcon={<DownloadIcon fontSize="inherit" />}
//         >
//           Download
//         </Button>
//         <Button
//           variant="outlined"
//           size="small"
//           color="neutral"
//           startIcon={<PrintIcon fontSize="inherit" />}
//         >
//           Print
//         </Button>
//       </Stack>
//     </PageContainerToolbar>
//   );
// }

export default function PageContainerBasic(props) {
  //   const { window } = props;
  //   const router = useDemoRouter('/orders');
  //   const theme = useTheme();
  //   // Remove this const when copying and pasting into your project.
  //   const demoWindow = window ? window() : undefined;

  return (
    <PageContainer>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Skeleton height={50}>
            <Card
              variant="outlined"
              orientation="horizontal"
              sx={{
                width: 320,
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >

              <CardContent>
                <Typography level="title-lg" id="card-description">
                  Yosemite Park
                </Typography>
                <Typography
                  level="body-sm"
                  aria-describedby="card-description"
                  sx={{ mb: 1 }}
                >
                  <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: "text.tertiary" }}
                  >
                    California, USA
                  </Link>
                </Typography>
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{ pointerEvents: "none" }}
                >
                  Cool weather all day long
                </Chip>
              </CardContent>
            </Card>
          </Skeleton>
        </Grid>
        <Grid size={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid size={4}>
          <Skeleton height={100} />
        </Grid>
        <Grid size={8}>
          <Skeleton height={100} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
