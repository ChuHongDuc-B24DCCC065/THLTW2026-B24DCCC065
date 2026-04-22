// src/components/PostManager.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Badge,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Post, getPosts, addPost, updatePost, deletePost, getTags } from "../model";

const { TextArea } = Input;
const { Option } = Select;

const PostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [form] = Form.useForm();
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    loadPosts();
    loadTags();
  }, []);

  const loadPosts = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(getPosts());
      setLoading(false);
    }, 300);
  };

  const loadTags = () => {
    setTags(getTags());
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    loadPosts();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        updatePost(editingPost.id, values);
      } else {
        addPost(values);
      }
      setModalVisible(false);
      loadPosts();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge status={status === "published" ? "success" : "warning"} text={status === "published" ? "Đã xuất bản" : "Bản nháp"} />
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      sorter: (a: Post, b: Post) => a.views - b.views,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: Post, b: Post) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Post) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          <Popconfirm title="Xóa bài viết?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <Space>
          <Input
            placeholder="Tìm kiếm theo tiêu đề"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
            <Option value="all">Tất cả</Option>
            <Option value="published">Đã xuất bản</Option>
            <Option value="draft">Bản nháp</Option>
          </Select>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm bài viết
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng ${total} bài viết` }}
      />

      <Modal
        title={editingPost ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item name="thumbnail" label="URL ảnh thumbnail" rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Vui lòng chọn tags" }]}>
            <Select mode="multiple" placeholder="Chọn tags">
              {tags.map(tag => (
                <Option key={tag.id} value={tag.name}>{tag.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select>
              <Option value="published">Đã xuất bản</Option>
              <Option value="draft">Bản nháp</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostManager;