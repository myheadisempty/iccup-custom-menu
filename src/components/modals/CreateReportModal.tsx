import { Modal, ModalProps } from "antd";
import { ReportForm } from "../forms/ReportForm";
import { ComponentProps, FC, useContext } from "react";
import { TournamentResultsContext } from "@/utils/context/TournamentResultsContext";

interface CreateReportModalProps extends ModalProps {
  onOk: ComponentProps<typeof ReportForm>["onOk"];
}

export const CreateReportModal: FC<CreateReportModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  const { tournamentResults } = useContext(TournamentResultsContext);

  return (
    <Modal
      title={tournamentResults?.title}
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
