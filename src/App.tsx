import { Layout } from "./components/layout/Layout";
import { RouterProvider } from "./hooks/useRouter";

const App = () => {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  );
};

export default App;
