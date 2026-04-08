import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Rate, Button, Upload, message, Space, Divider, Row, Col } from 'antd';
import { UploadOutlined, SaveOutlined, LinkOutlined } from '@ant-design/icons';
import { Destination } from '../travel';

const { TextArea } = Input;

interface AdminDestinationFormProps {
    initialData?: Partial<Destination>;
    onSubmit: (data: Omit<Destination, 'id'>) => void;
}

const AdminDestinationForm: React.FC<AdminDestinationFormProps> = ({ initialData, onSubmit }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(initialData?.image || '');

    const handleSubmit = (values: any) => {
        if (!imageUrl) {
            message.error('Vui lòng nhập link hình ảnh!');
            return;
        }

        onSubmit({
            ...values,
            image: imageUrl,
            type: values.type as 'beach' | 'mountain' | 'city',
        });
        message.success('Điểm đến đã được lưu!');
        form.resetFields();
        setImageUrl('');
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialData}
            onFinish={handleSubmit}
        >
            <Form.Item label="Hình ảnh" required>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                        placeholder="Nhập link hình ảnh (URL)"
                        prefix={<LinkOutlined />}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        allowClear
                    />

                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => {
                            const reader = new FileReader();
                            reader.onload = (e) => setImageUrl(e.target?.result as string);
                            reader.readAsDataURL(file);
                            return false; 
                        }}
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Tải lên từ máy</div>
                        </div>
                    </Upload>

                    {imageUrl && (
                        <div style={{ marginTop: 8 }}>
                            <img 
                                src={imageUrl} 
                                alt="preview" 
                                style={{ 
                                    maxWidth: '100%', 
                                    maxHeight: 200, 
                                    borderRadius: 8,
                                    border: '1px solid #d9d9d9'
                                }} 
                            />
                        </div>
                    )}
                </Space>
            </Form.Item>

            <Form.Item
                name="name"
                label="Tên điểm đến"
                rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}
            >
                <Input placeholder="VD: Vịnh Hạ Long" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Mô tả"
            >
                <TextArea rows={3} placeholder="Mô tả chi tiết về điểm đến" />
            </Form.Item>

            <Form.Item
                name="type"
                label="Loại địa điểm"
                rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
            >
                <Select placeholder="Chọn loại">
                    <Select.Option value="beach">Biển</Select.Option>
                    <Select.Option value="mountain">Núi</Select.Option>
                    <Select.Option value="city">Thành phố</Select.Option>
                </Select>
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="duration"
                        label="Thời gian tham quan (giờ)"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
                    >
                        <InputNumber min={1} placeholder="VD: 8" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="rating"
                        label="Rating (1-5 sao)"
                        rules={[{ required: true, message: 'Vui lòng chọn rating' }]}
                    >
                        <Rate defaultValue={4} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider>Chi phí chi tiết</Divider>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="costFood"
                        label="Chi ăn uống (VNĐ)"
                    >
                        <InputNumber placeholder="VD: 300000" formatter={value => {
                            if (!value) return '';
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="costAccommodation"
                        label="Chi lưu trú (VNĐ)"
                    >
                        <InputNumber placeholder="VD: 300000" formatter={value => {
                            if (!value) return '';
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="costTransport"
                        label="Chi di chuyển (VNĐ)"
                    >
                        <InputNumber placeholder="VD: 200000" formatter={value => {
                            if (!value) return '';
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="priceAvg"
                        label="Tổng giá (VNĐ)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                    >
                        <InputNumber placeholder="VD: 800000" formatter={value => {
                            if (!value) return '';
                            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        }} />
                    </Form.Item>
                </Col>
            </Row>

            <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                htmlType="submit"
                block
                size="large"
            >
                Lưu điểm đến
            </Button>
        </Form>
    );
};

export default AdminDestinationForm;