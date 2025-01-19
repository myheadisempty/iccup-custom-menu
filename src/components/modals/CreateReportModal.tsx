import { Modal, ModalProps } from "antd";
import { ReportForm } from "../forms/ReportForm";
import { ComponentProps, FC } from "react";
import useTournamentStore from "@/store/tournamentStore";

interface CreateReportModalProps extends Pick<ModalProps, "open" | "onCancel"> {
  onOk: ComponentProps<typeof ReportForm>["onOk"];
}

export const CreateReportModal: FC<CreateReportModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  const { tournamentData } = useTournamentStore();

  if (!tournamentData) return null;

  return (
    <Modal
      title={tournamentData.title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose
      centered
      footer={null}
    >
      <ReportForm onOk={onOk} />
    </Modal>
  );
};
