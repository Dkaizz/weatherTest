import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';

function App() {
  console.log(publicRoutes);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            console.log('Layout: ', route.layout);
            if (route.layout) {
              Layout = route.layout;
            } else {
              if (route.layout === null) {
                Layout = Fragment;
              }
            }
            console.log(Layout);
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
