// src/components/About.tsx
import React from "react";
import { Card, Avatar, Typography, Tag, Button, Space, Row, Col, Divider } from "antd";
import { GithubOutlined, LinkedinOutlined, MailOutlined, FacebookOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  const skills = ["React", "TypeScript", "Ant Design", "Node.js", "Python", "Docker", "GraphQL", "Next.js"];

  return (
    <div>
      <Card>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <Avatar
              size={180}
              src="data:image/jpeg;base64,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"
              style={{ border: "4px solid #f0f0f0" }}
            />
            <Title level={3} style={{ marginTop: 16 }}>Chu Hồng Đức</Title>
            <Text type="secondary">Senior Frontend Developer</Text>
            <div style={{ marginTop: 16 }}>
              <Space>
                <Button icon={<GithubOutlined />} href="https://github.com" target="_blank" />
                <Button icon={<LinkedinOutlined />} href="https://linkedin.com" target="_blank" />
                <Button icon={<FacebookOutlined />} href="https://facebook.com" target="_blank" />
                <Button icon={<MailOutlined />} href="mailto:contact@example.com" />
              </Space>
            </div>
          </Col>
          
          <Col xs={24} md={16}>
            <Title level={4}>Giới thiệu</Title>
            <Paragraph>
              Xin chào! Tôi là một Frontend Developer với hơn 5 năm kinh nghiệm trong việc xây dựng các ứng dụng web hiện đại, 
              responsive và user-friendly. Tôi đam mê công nghệ và luôn cập nhật những xu hướng mới nhất trong phát triển web.
            </Paragraph>
            
            <Title level={4}>Kinh nghiệm làm việc</Title>
            <Paragraph>
              <strong>Senior Frontend Developer - Công ty ABC (2022 - nay)</strong><br />
              - Phát triển và bảo trì các ứng dụng React quy mô lớn<br />
              - Tối ưu hiệu suất và trải nghiệm người dùng<br />
              - Mentor các junior developer
            </Paragraph>
            <Paragraph>
              <strong>Frontend Developer - Công ty XYZ (2019 - 2022)</strong><br />
              - Xây dựng giao diện người dùng với React và Ant Design<br />
              - Tích hợp REST API và quản lý state với Redux<br />
              - Viết unit test với Jest và React Testing Library
            </Paragraph>
            
            <Title level={4}>Học vấn</Title>
            <Paragraph>
              <strong>Học viện Công Nghệ Bưu Chính Viễn Thông</strong><br />
              Cử Nhân Công Nghệ Thông Tin - Chuyên ngành công nghệ phần mềm (2015 - 2019)<br />
              
            </Paragraph>
            
            <Divider />
            
            <Title level={4}>Kỹ năng</Title>
            <div>
              {skills.map(skill => (
                <Tag key={skill} color="blue" style={{ fontSize: 14, padding: "4px 12px", margin: "4px" }}>
                  {skill}
                </Tag>
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default About;