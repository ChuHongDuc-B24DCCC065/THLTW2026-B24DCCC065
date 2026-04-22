// src/components/Home.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Input, Pagination, Tag as AntTag, Empty, Spin, Typography, Space } from "antd";
import { SearchOutlined, EyeOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Post, searchPosts, filterByTag } from "../model";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

interface HomeProps {
  onViewPost: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ onViewPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    loadPosts();
  }, [searchTerm, selectedTag]);

  const loadPosts = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = searchTerm ? searchPosts(searchTerm) : filterByTag(selectedTag);
      setPosts(filtered);
      setLoading(false);
    }, 300);
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
    setCurrentPage(1);
  };

  const paginatedPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Bài viết mới nhất</Title>
        <Search
          placeholder="Tìm kiếm bài viết..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      {selectedTag && (
        <div style={{ marginBottom: 16 }}>
          <Text>Lọc theo tag: </Text>
          <AntTag closable onClose={() => setSelectedTag("")} color="blue">
            {selectedTag}
          </AntTag>
        </div>
      )}

      <Spin spinning={loading}>
        {paginatedPosts.length === 0 ? (
          <Empty description="Không tìm thấy bài viết nào" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {paginatedPosts.map((post) => (
                <Col xs={24} sm={12} lg={8} key={post.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={post.title}
                        src={post.thumbnail}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    onClick={() => onViewPost(post.slug)}
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                    bodyStyle={{ flex: 1 }}
                  >
                    <Title level={4} style={{ marginBottom: 8 }}>{post.title}</Title>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ color: "#666", marginBottom: 12 }}>
                      {post.content.replace(/[#*`>]/g, "").substring(0, 100)}...
                    </Paragraph>
                    <Space direction="vertical" size={4} style={{ width: "100%" }}>
                      <Space split={<span>•</span>}>
                        <Text type="secondary">
                          <CalendarOutlined /> {formatDate(post.createdAt)}
                        </Text>
                        <Text type="secondary">
                          <UserOutlined /> {post.author}
                        </Text>
                        <Text type="secondary">
                          <EyeOutlined /> {post.views}
                        </Text>
                      </Space>
                      <div>
                        {post.tags.map((tag) => (
                          <AntTag
                            key={tag}
                            color="blue"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                          >
                            {tag}
                          </AntTag>
                        ))}
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={posts.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};

export default Home;