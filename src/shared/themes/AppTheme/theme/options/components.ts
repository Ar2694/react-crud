import { ThemeOptions } from "@mui/material/styles";

const components: ThemeOptions = {
  components: {
    MuiTextField: {
      defaultProps: {
        sx: (theme) => ({
          backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : ""
        })
      }
    },
    MuiModal: {
      defaultProps: {
        sx: {
          "& .MuiBox-root": {
            position: 'absolute' as 'absolute',
            top: '300px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          },
          "& .MuiFormControl-root": {
            marginBottom: 3
          }
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        sx: {
          "& .MuiPaper-root": {
            overflow: "unset",
            position: "unset"
          },
          "& .MuiBox-root": {
            width: 400,
            textAlign: "center",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          },
          "& .MuiTypography-root": {
            margin: "15px 0 25px 0"
          },
          "& .MuiSvgIcon-root": {
            width: 32,
            height: 32,
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0
        }
      }
    }
  }
};

export default components;