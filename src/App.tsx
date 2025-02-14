import { BrowserRouter } from 'react-router-dom';
import {Layout} from '@/components/layout.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="space-portfolio-theme">
        <Layout />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;