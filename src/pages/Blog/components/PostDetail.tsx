// src/components/PostDetail.tsx
import React, { useEffect, useState } from "react";
import { Card, Tag, Typography, Button, Space, Divider, Row, Col, Spin, Empty } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, EyeOutlined, TagOutlined } from "@ant-design/icons";
import { getPostBySlug, incrementView, getPublishedPosts, Post } from "../model";

const { Title, Text, Paragraph } = Typography;

interface PostDetailProps {
  slug: string;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ slug, onBack }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        incrementView(foundPost.id);
        
        const allPosts = getPublishedPosts();
        const related = allPosts
          .filter(p => p.id !== foundPost.id && p.tags.some(tag => foundPost.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;
  }

  if (!post) {
    return <Empty description="Không tìm thấy bài viết" />;
  }

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginBottom: 24 }}>
        Quay lại
      </Button>
      
      <Card>
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 8, marginBottom: 24 }}
        />
        
        <Title level={2}>{post.title}</Title>
        
        <Space split={<Divider type="vertical" />} style={{ marginBottom: 16 }}>
          <Text><CalendarOutlined /> {formatDate(post.createdAt)}</Text>
          <Text><UserOutlined /> {post.author}</Text>
          <Text><EyeOutlined /> {post.views} lượt xem</Text>
        </Space>
        
        <div style={{ marginBottom: 24 }}>
          <TagOutlined /> Tags:
          {post.tags.map(tag => (
            <Tag key={tag} color="blue" style={{ marginLeft: 8 }}>
              {tag}
            </Tag>
          ))}
        </div>
        
        <Divider />
        
        
      </Card>

      {relatedPosts.length > 0 && (
        <>
          <Divider orientation="left">Bài viết liên quan</Divider>
          <Row gutter={[16, 16]}>
            {relatedPosts.map(relatedPost => (
              <Col xs={24} sm={12} md={8} key={relatedPost.id}>
                <Card
                  hoverable
                  cover={<img alt={relatedPost.title} src={relatedPost.thumbnail} style={{ height: 150, objectFit: "cover" }} />}
                >
                  <Card.Meta
                    title={relatedPost.title}
                    description={
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {relatedPost.content.replace(/[#*`>]/g, "").substring(0, 80)}...
                      </Paragraph>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default PostDetail;