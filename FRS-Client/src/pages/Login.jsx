import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Avatar, TextField, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Colors } from "../styles/Colors"; // Import the Colors object

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("sending data");
    
    const response = await fetch(
      "https://797828f8-7c71-4baf-ad12-ba45737ee195-00-3sedyt4w8ehb2.pike.replit.dev/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    console.log("sent data");
    
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data["message"]);
      console.log(data);
      if (data["role"] === "admin") {
        navigate("/admin");
      } else if (data["role"] === "student") {
        navigate("/student");
      } else if (data["role"] === "faculty") {
        navigate("/faculty");
      }
    } else {
      const error = await response.json();
      console.error("Login failed:", error);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 280,
    backgroundColor: Colors.headerBackground,
  };

  const avatarStyle = { backgroundColor: "#112233" };
  const btnStyle = {
    margin: "8px 0",
    backgroundColor: Colors.buttonColor,
    color: Colors.buttonTextColor,
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: Colors.backgroundColor,
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={containerStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={{ color: Colors.textColor }}>
            Sign In
          </Typography> 

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              placeholder="Enter username"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#FFFFFF" },
              }}
              margin="normal"
            />

            <TextField

              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              style={btnStyle}
              fullWidth
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
