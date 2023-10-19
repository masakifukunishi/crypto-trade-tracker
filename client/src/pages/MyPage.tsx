import Header from "../components/header";
import { login, logout } from "../utils/auth";
import useAuth from "../hooks/useAuth";

const MyPage: React.FC = () => {
  const user = useAuth();
  console.log(user);
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen py-1 px-3">
      <Header />
      {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
    </div>
  );
};

export default MyPage;
