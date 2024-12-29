import React, { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 使用 useNavigate 进行路由跳转
import { useGetUsersQuery } from "../slices/watchlistApiSlice";

export function Login() {
  const [username, setUsername] = useState(""); // 存储用户名
  const [password, setPassword] = useState(""); // 存储密码
  const [error, setError] = useState(null); // 存储错误信息
  const navigate = useNavigate(); // 用于跳转页面

  const handleLogin = async (e) => {
    e.preventDefault(); // 阻止表单的默认提交行为

    // 发送 POST 请求到后端进行验证
    try {
    //   const response = await axios.post("/api/login", {
    //     username,
    //     password,
    //   });
    const { data: users, isLoading, isError, error } = useGetUsersQuery(); 
    console.log(`users:` + users);
    // 如果后端返回的状态表示成功，跳转到首页
    //   if (response.data.success) {
    //     navigate("/"); // 跳转到用户面板（你可以根据实际情况修改跳转页面）
    //   } else {
    //     setError("Invalid username or password"); // 如果登录失败，显示错误信息
    //   }
    // } catch (err) {
    //   setError("An error occurred during login"); // 如果请求失败，显示错误信息
    // }
  };
  // fetch user data from backend
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("/api/user");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       return null;
//     }
//   };
//   fetchUserData();

  return (
    <Card className="flex max-w-md flex-col gap-4 p-6">
      <form onSubmit={handleLogin}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>} {/* 显示错误信息 */}

        <Button type="submit" className="mt-4">
          Login
        </Button>
      </form>
    </Card>
  );
}
export default Login