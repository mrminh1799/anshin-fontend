import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as toastHelper from "../common/ToastHelper";
import { useHistory } from "react-router-dom";
import * as LoginService from "../service/LoginService";
import { useForm } from "react-hook-form";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onLogin(data);
    console.log(data);
  };

  const onLogin = async (data) => {
    LoginService.loginToken(data)
      .then((response) => {
        console.log("đây là data gửi về: ", response.data);
        if (
          response.data !== "" &&
          response.data !== undefined &&
          response.data != null
        ) {
            // lúc nào sửa thì đổi lại 
          if (response.data.isActive !== false) {
            if (
              response.data.roles.includes("Admin")||
              response.data.roles.includes("Super_Admin")
          
            ) {
              toastHelper.toastSuccess("Đăng nhập thành công!");
              localStorage.setItem("TokenLogin", response.data.accessToken);
              localStorage.setItem("userLogin", JSON.stringify(response.data));
              history.replace("/admin");
            }
            if (response.data.roles.includes("Custommer")) {
              toastHelper.toastSuccess("Đăng nhập thành công!");
              localStorage.setItem("TokenLogin", response.data);
              localStorage.setItem("userLogin", JSON.stringify(response.data));
              history.replace("/");
            }
          } else {
            toastHelper.toastError("Tài khoản đã bị khóa!!!");
            localStorage.removeItem("userLogin");
            localStorage.removeItem("TokenLogin");
          }
        } else {
          toastHelper.toastError("Đăng nhập thất bại!!!");
          localStorage.removeItem("userLogin");
          localStorage.removeItem("TokenLogin");
        }
      })
      .catch(function (error) {
        toastHelper.toastError(
          "Thông tin tài khoản hoặc mật khẩu không chính xác!!!"
        );
        localStorage.removeItem("userLogin");
        localStorage.removeItem("TokenLogin");
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("username")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
