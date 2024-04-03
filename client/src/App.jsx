import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./sharedContext/UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import { PhotosContextProvider } from "./sharedContext/PhotosContext.jsx";
import ShowPlacePage from "./pages/ShowPlacePage.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  scheme: 'https',
}

function App() {
  return (
    <UserContextProvider>
      <PhotosContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpages?" element={<AccountPage />} />
            <Route path="/account/:subpages/:action?/:id?" element={<AccountPage />} />
            <Route path="/place/:id" element={<ShowPlacePage />} />
          </Route>
        </Routes>
      </PhotosContextProvider>
    </UserContextProvider>

  );
}

export default App;
