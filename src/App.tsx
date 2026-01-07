import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetPage } from './pages/BudgetPage';
import { ReportsPage } from './pages/ReportsPage';
import { RegistrationsPage } from './pages/RegistrationsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans text-primary scroll-smooth">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/transactions" element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/budget" element={
                <ProtectedRoute>
                  <BudgetPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/reports" element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/registrations" element={
                <ProtectedRoute>
                  <RegistrationsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </TransactionProvider>
    </AuthProvider >
  );
}

export default App;
