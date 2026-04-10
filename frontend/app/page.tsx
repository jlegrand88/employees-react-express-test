"use client";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Card,
  Avatar,
  Tag,
  Space,
  Typography,
  Alert,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useTheme } from "next-themes";

const { Title, Text } = Typography;

export default function Home() {
  const { resolvedTheme } = useTheme();
  const {
    employees,
    selectedEmployee,
    loading,
    error,
    fetchEmployees,
    fetchEmployeeById,
    clearSelected,
  } = useEmployeeStore();
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
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 130,
      render: (text: string) => <b className="text-blue-600">{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (pos: string) => <Tag color="blue">{pos}</Tag>,
    },
    {
      title: "Dpto.",
      dataIndex: "department",
      key: "department",
      width: 120,
    },
    {
      title: "Acciones",
      key: "action",
      width: 100,
      render: (_: unknown, record: { id: number }) => (
        <Button type="primary" onClick={() => showDetail(record.id)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
      {error && <Alert title={error} type="error" showIcon className="mb-4" />}

      {loading && employees.length === 0 ? (
        <div className="p-4">
          <Skeleton active avatar paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <Table
          dataSource={employees}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 6,
            placement: ["bottomCenter"],
            size: "small", // Más amigable en mobile
          }}
          // CAMBIOS AQUÍ:
          scroll={{ x: "max-content" }}
          tableLayout="fixed"
          className="mt-4 border border-gray-100 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-900"
          size="middle"
        />
      )}

      {/* MODAL DE DETALLE (Se mantiene igual pero con ancho responsivo) */}
      <Modal
        title="Ficha del Empleado"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="close" type="primary" onClick={handleClose}>
            Entendido
          </Button>,
        ]}
        width={600}
        centered
        rootClassName={resolvedTheme === "dark" ? "dark" : ""}
      >
        {selectedEmployee && (
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar
              size={120}
              src={selectedEmployee.avatar}
              icon={<UserOutlined />}
              className="border-4 border-blue-50"
            />
            <Title level={3} style={{ margin: 0 }}>
              {selectedEmployee.name}
            </Title>
            <Text
              type="secondary"
              className="uppercase tracking-widest text-xs"
            >
              {selectedEmployee.position} | {selectedEmployee.department}
            </Text>

            <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
              <Space>
                <MailOutlined className="text-blue-500" />
                <Text className="dark:text-zinc-300">
                  {selectedEmployee.email}
                </Text>
              </Space>

              <Space>
                <IdcardOutlined className="text-blue-500" />
                <Text className="dark:text-zinc-300">
                  ID Interno: {selectedEmployee.id}
                </Text>
              </Space>

              <Space>
                <CalendarOutlined className="text-blue-500" />
                <Text className="dark:text-zinc-300">
                  Ingreso:{" "}
                  {new Date(selectedEmployee.hiredate).toLocaleDateString()}
                </Text>
              </Space>

              <Space>
                <Text className="font-bold text-green-600 dark:text-green-400 text-lg">
                  CLP {selectedEmployee.salary.toLocaleString()}
                </Text>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
