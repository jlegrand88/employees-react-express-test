"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Card, Avatar, Tag, Space, Typography, Alert, Skeleton } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined, CalendarOutlined } from "@ant-design/icons";
import { useEmployeeStore } from "@/store/useEmployeeStore";

const { Title, Text } = Typography;

export default function Home() {
  const { employees, selectedEmployee, loading, error, fetchEmployees, fetchEmployeeById, clearSelected } = useEmployeeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const showDetail = async (id: number) => {
    await fetchEmployeeById(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    clearSelected();
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name', render: (text: string) => <b>{text}</b> },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Posición', dataIndex: 'position', key: 'position', render: (pos: string) => <Tag color="blue">{pos}</Tag> },
    { title: 'Departamento', dataIndex: 'department', key: 'department' },
    {
      title: 'Acciones',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="primary" onClick={() => showDetail(record.id)}>Ver Detalle</Button>
      ),
    },
  ];

  return (
    // Centrado absoluto con Flexbox
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl shadow-xl border-0">
        <Title level={2} className="mb-6 text-center sm:text-left">Gestión de Empleados</Title>
        
        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        {/* Estado de Carga con Skeleton */}
        {loading && employees.length === 0 ? (
          <div className="p-4">
            <Skeleton active avatar paragraph={{ rows: 8 }} />
          </div>
        ) : (
          <Table 
            dataSource={employees} 
            columns={columns} 
            rowKey="id" 
            pagination={{ pageSize: 6, placement: ['bottomCenter'] }}
            className="overflow-hidden"
          />
        )}
      </Card>

      {/* MODAL DE DETALLE (Se mantiene igual) */}
      <Modal
        title="Ficha del Empleado"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[<Button key="close" type="primary" onClick={handleClose}>Entendido</Button>]}
        width={600}
        centered // También centramos el modal para que se vea Pro
      >
        {selectedEmployee && (
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar 
              size={120} 
              src={selectedEmployee.avatar} 
              icon={<UserOutlined />} 
              className="border-4 border-blue-50"
            />
            <Title level={3} style={{ margin: 0 }}>{selectedEmployee.name}</Title>
            <Text type="secondary" className="uppercase tracking-widest text-xs">{selectedEmployee.position} | {selectedEmployee.department}</Text>
            
            <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
              <Space><MailOutlined className="text-blue-500" /> <Text>{selectedEmployee.email}</Text></Space>
              <Space><IdcardOutlined className="text-blue-500" /> <Text>ID Interno: {selectedEmployee.id}</Text></Space>
              <Space><CalendarOutlined className="text-blue-500" /> <Text>Ingreso: {new Date(selectedEmployee.hiredate).toLocaleDateString()}</Text></Space>
              <Space><Text className="font-bold text-green-600 text-lg">CLP {selectedEmployee.salary.toLocaleString()}</Text></Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}