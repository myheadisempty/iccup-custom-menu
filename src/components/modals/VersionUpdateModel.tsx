import { Modal, Button, Typography } from "antd";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text, Link } = Typography;

export const VersionUpdateModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (!modalShown) {
      setOpen(true);
      localStorage.setItem("modalShown", "true");
    }
  }, []);

  const handleOk = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Обновление v0.2.0"
      open={open}
      footer={
        <Button type="primary" onClick={handleOk}>
          Понятно
        </Button>
      }
      destroyOnClose
      closeIcon={null}
    >
      <Typography>
        <Title level={4}>Описание</Title>
        <Paragraph>
          <ul>
            <li>
              Убран неактуальный тег <Text code>[color][/color]</Text>
            </li>
          </ul>
        </Paragraph>
        <Title level={4}>P.S.</Title>
        <Paragraph>
          Хочется поздравить{" "}
          <Link
            target="_blank"
            href="https://iccup.com/profile/view/iCCup.RoGad.html"
          >
            iCCup.RoGad
          </Link>{" "}
          с возвращением в Custom Tournaments секцию!
        </Paragraph>
      </Typography>
    </Modal>
  );
};
