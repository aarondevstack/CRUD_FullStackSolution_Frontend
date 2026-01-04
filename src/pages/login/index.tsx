import { useLogin } from "@refinedev/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { mutate: login, isPending: isLoading } = useLogin();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3
            }}
          >
            <Typography component="h1" variant="h5">
              CRUD Admin
            </Typography>
          </Box>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            {t("pages.login.signin", "Sign in")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("username", {
                required: t("pages.login.fields.username.required", "Username is required") as string,
              })}
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("pages.login.fields.username", "Username")}
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message as string}
            />
            <TextField
              {...register("password", {
                required: t("pages.login.fields.password.required", "Password is required") as string,
              })}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("pages.login.fields.password", "Password")}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("pages.login.buttons.rememberMe", "Remember me")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? t("pages.login.buttons.submit", "Signing in...") : t("pages.login.buttons.submit", "Sign In")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("pages.login.buttons.forgotPassword", "Forgot password?")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {t("pages.login.buttons.noAccount", "Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
