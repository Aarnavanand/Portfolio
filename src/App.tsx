import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="space-portfolio-theme">
      <Layout />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;