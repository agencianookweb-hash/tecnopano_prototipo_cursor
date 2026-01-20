import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MockFlowProvider } from "@/context/MockFlowContext";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Team from "@/pages/Team";
import Login from "@/pages/auth/Login";

// New Flow Pages
import SolicitacaoColeta from "@/pages/coleta/SolicitacaoColeta";
import EntradaColeta from "@/pages/coleta/EntradaColeta";
import GalpaoPainel from "@/pages/galpao/GalpaoPainel";
import Separacao from "@/pages/processo/Separacao";
import Producao from "@/pages/processo/Producao";
import EstoqueEntrada from "@/pages/estoque/EstoqueEntrada";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <AppLayout>
      <Component {...rest} />
    </AppLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      {/* Protected Routes */}
      <Route path="/">
        {() => <PrivateRoute component={Dashboard} />}
      </Route>
      <Route path="/equipe">
        {() => <PrivateRoute component={Team} />}
      </Route>
      
      {/* Tecnopano 4.0 Flow Routes */}
      <Route path="/coleta/solicitacao">
        {() => <PrivateRoute component={SolicitacaoColeta} />}
      </Route>
      <Route path="/coleta/entrada">
        {() => <PrivateRoute component={EntradaColeta} />}
      </Route>
      <Route path="/galpao">
        {() => <PrivateRoute component={GalpaoPainel} />}
      </Route>
      <Route path="/separacao">
        {() => <PrivateRoute component={Separacao} />}
      </Route>
      <Route path="/producao">
        {() => <PrivateRoute component={Producao} />}
      </Route>
      <Route path="/estoque/entrada">
        {() => <PrivateRoute component={EstoqueEntrada} />}
      </Route>

      {/* Fallbacks */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MockFlowProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </MockFlowProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
