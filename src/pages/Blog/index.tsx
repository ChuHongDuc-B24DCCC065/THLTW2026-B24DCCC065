// src/index.tsx
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Home from "./components/Home";
import PostDetail from "./components/PostDetail";
import About from "./components/About";
import PostManager from "./components/PostManager";
import TagManager from "./components/TagManager";

const { Header, Sider, Content } = Layout;

type View = "home" | "about" | "admin-posts" | "admin-tags" | "post-detail";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const colorBgContainer = "#ffffff";
  const borderRadiusLG = 6;

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "admin-posts",
      icon: <UnorderedListOutlined />,
      label: "Quản lý bài viết",
    },
    {
      key: "admin-tags",
      icon: <TagOutlined />,
      label: "Quản lý tag",
    },
    {
      key: "about",
      icon: <UserOutlined />,
      label: "Giới thiệu",
    },
  ];

  const handleMenuClick = (key: string) => {
    setCurrentView(key as View);
    setSelectedSlug("");
  };

  const handleViewPost = (slug: string) => {
    setSelectedSlug(slug);
    setCurrentView("post-detail");
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <Home onViewPost={handleViewPost} />;
      case "post-detail":
        return <PostDetail slug={selectedSlug} onBack={() => setCurrentView("home")} />;
      case "about":
        return <About />;
      case "admin-posts":
        return <PostManager />;
      case "admin-tags":
        return <TagManager />;
      default:
        return <Home onViewPost={handleViewPost} />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: colorBgContainer }}>
        <div style={{ height: 32, margin: 16, background: "rgba(0, 0, 0, 0.1)" }} />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[currentView === "post-detail" ? "home" : currentView]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;