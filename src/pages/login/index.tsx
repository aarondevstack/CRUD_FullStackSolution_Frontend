import { AuthPage } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <h3>CRUD Admin</h3>
        </div>
      }
      formProps={{
        defaultValues: { email: "", password: "" },
      }}
    />
  );
};
