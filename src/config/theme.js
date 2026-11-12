import { createMuiTheme } from "@material-ui/core/styles";

// Design tokens Maunginap
const tokens = {
  primary: "#0F766E", // teal
  primaryDark: "#0B5C56",
  primaryLight: "#5EEAD4",
  accent: "#F59E0B", // amber
  ink: "#0F172A",
  muted: "#64748B",
  surface: "#FFFFFF",
  canvas: "#F4F7F6",
  border: "#E2E8F0",
  radius: 14,
};

const fontFamily = '"Plus Jakarta Sans", "Poppins", -apple-system, "Segoe UI", Roboto, sans-serif';

const softShadow = "0 1px 2px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06)";
const hoverShadow = "0 2px 4px rgba(15,23,42,.08), 0 12px 28px rgba(15,23,42,.12)";

const theme = createMuiTheme({
  palette: {
    primary: { main: tokens.primary, dark: tokens.primaryDark, light: tokens.primaryLight },
    secondary: { main: tokens.accent },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.canvas, paper: tokens.surface },
    divider: tokens.border,
  },
  shape: { borderRadius: tokens.radius },
  typography: {
    fontFamily,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: { backgroundColor: tokens.canvas },
        "::selection": { backgroundColor: tokens.primaryLight },
      },
    },
    MuiButton: {
      root: { borderRadius: 12, padding: "8px 20px" },
      contained: { boxShadow: "none", "&:hover": { boxShadow: softShadow } },
      containedPrimary: {
        backgroundImage: `linear-gradient(135deg, ${tokens.primary}, #14B8A6)`,
      },
      sizeLarge: { padding: "12px 28px", fontSize: "1rem" },
    },
    MuiCard: {
      root: {
        borderRadius: tokens.radius + 4,
        boxShadow: softShadow,
        border: `1px solid ${tokens.border}`,
        overflow: "hidden",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: hoverShadow },
      },
    },
    MuiPaper: {
      rounded: { borderRadius: tokens.radius },
      elevation1: { boxShadow: softShadow },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundImage: `linear-gradient(135deg, ${tokens.primaryDark}, ${tokens.primary})`,
      },
    },
    MuiOutlinedInput: {
      root: { borderRadius: 12, backgroundColor: tokens.surface },
    },
    MuiChip: {
      root: { fontWeight: 600 },
    },
    MuiDialog: {
      paper: { borderRadius: tokens.radius + 6 },
    },
    MuiBottomNavigation: {
      root: {
        height: 64,
        borderTop: `1px solid ${tokens.border}`,
        boxShadow: "0 -4px 20px rgba(15,23,42,.06)",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 6,
          left: "50%",
          width: 0,
          height: 30,
          borderRadius: 16,
          backgroundColor: "#CCFBF1",
          transform: "translateX(-50%)",
          transition: "width .25s ease",
        },
        "&$selected": { color: tokens.primary },
        "&$selected::before": { width: 60 },
      },
      wrapper: { position: "relative", zIndex: 1 },
      label: { fontWeight: 600, fontSize: 11, "&$selected": { fontSize: 11 } },
    },
    MuiTab: { root: { textTransform: "none", fontWeight: 600 } },
    MuiTooltip: { tooltip: { borderRadius: 8 } },
  },
});

export default theme;
