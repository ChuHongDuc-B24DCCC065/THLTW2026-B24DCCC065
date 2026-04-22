// src/components/TagManager.tsx
import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input, Modal, Form, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TagType, getTags, addTag, updateTag, deleteTag, getTagPostCount } from "../model";

const TagManager: React.FC = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = () => {
    setLoading(true);
    setTimeout(() => {
      setTags(getTags());
      setLoading(false);
    }, 300);
  };

  const handleAdd = () => {
    setEditingTag(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (tag: TagType) => {
    setEditingTag(tag);
    form.setFieldsValue({ name: tag.name });
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteTag(id);
    loadTags();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        updateTag(editingTag.id, values.name);
      } else {
        addTag(values.name);
      }
      setModalVisible(false);
      loadTags();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns = [
    {
      title: "Tên Tag",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Số bài viết",
      key: "postCount",
      render: (_: any, record: TagType) => getTagPostCount(record.name),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: TagType) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          <Popconfirm
            title={`Xóa tag "${record.name}"? Các bài viết có tag này sẽ bị xóa tag.`}
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm tag mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tags}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng ${total} tag` }}
      />

      <Modal
        title={editingTag ? "Chỉnh sửa tag" : "Thêm tag mới"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên tag"
            rules={[
              { required: true, message: "Vui lòng nhập tên tag" },
              { min: 2, message: "Tên tag phải có ít nhất 2 ký tự" },
            ]}
          >
            <Input placeholder="Ví dụ: react, typescript, antd" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagManager;