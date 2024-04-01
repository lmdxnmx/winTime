import React from 'react';
import './App.css';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import MainPage from './Pages/MainPage';
import { Routes, Route, Outlet } from "react-router-dom";
import OnlineChartPage from './Pages/OnlineChartPage';
import Layout from './HOC/Layout';
import DashboardsPage from './Pages/DashboardsPage';
import OnlineItemPage from './Pages/OnlineItemPage';
function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path="online"
          element={
            <Layout>
              <OnlineChartPage />
            </Layout>
          }
        />
              <Route
          path="online/:id"
          element={
            <Layout>
              <OnlineItemPage />
            </Layout>
          }
        />
        <Route
          path="dashboards"
          element={
            <Layout>
              <DashboardsPage />
            </Layout>
          }
        />
      </Routes>
    </Theme>
  );
}

export default App;
