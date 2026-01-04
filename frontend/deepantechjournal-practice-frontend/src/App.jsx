import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import UploadPage from "./pages/UploadPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import AutomationLab from "./pages/AutomationLab";
import AdvancedUiLab from "./pages/AdvancedUiLab";
import LocatorLab from "./pages/LocatorLab";
import AdminProductAdd from "./pages/AdminProductAdd";
import AdminCsvUpload from "./pages/AdminCsvUpload";
import AdminProductImages from "./pages/AdminProductImages";
import AdminExcelUpload from "./pages/AdminExcelUpload";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ApiLab from "./pages/ApiLab";
import DbLab from "./pages/DbLab";
import SecurityLab from "./pages/SecurityLab";

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-slate-100">
        <nav className="flex items-center justify-between px-6 py-3 bg-slate-900 text-white">
          <Link to="/" className="font-semibold text-lg">
            DeepanTechJournal
          </Link>
          <div className="space-x-4 flex items-center text-sm">
            <Link to="/products">Products</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/playground">Playground</Link>
            <Link to="/lab">Automation Lab</Link>
            <Link to="/lab/advanced">Advanced UI Lab</Link>
            <Link to="/lab/locators">Locator Lab</Link>

            {user?.role === "ADMIN" && (
              <>
                <Link to="/admin/products/add" className="text-blue-300">
                  Add Product
                </Link>
                <Link to="/admin/products/csv" className="text-blue-300">
                  Bulk CSV
                </Link>
                <Link to="/admin/products/xlsx" className="text-blue-300">
                  Bulk Excel
                </Link>
                <Link to="/admin/products/images" className="text-blue-300">
                  Images
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {user && (
              <button
                onClick={logout}
                className="bg-red-600 px-2 py-1 rounded text-xs"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/lab" element={<AutomationLab />} />
            <Route path="/lab/advanced" element={<AdvancedUiLab />} />
            <Route path="/lab/locators" element={<LocatorLab />} />
            <Route path="/lab/api" element={<ApiLab />} />
            <Route path="/lab/db" element={<DbLab />} />
            <Route path="/lab/security" element={<SecurityLab />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminProductAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/csv"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminCsvUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/xlsx"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminExcelUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/images"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminProductImages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
