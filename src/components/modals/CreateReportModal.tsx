import { Modal, ModalProps } from "antd";
import { ReportForm } from "../forms/ReportForm";
import { ComponentProps, FC, useState } from "react";
import { TournamentResults } from "@/utils/types";

interface CreateReportModalProps extends Omit<ModalProps, "afterClose"> {
  tournamentResults: TournamentResults;
  afterClose: (updatedResults: TournamentResults | undefined) => void;
  onOk: ComponentProps<typeof ReportForm>["onOk"];
}

export const CreateReportModal: FC<CreateReportModalProps> = ({
  open,
  tournamentResults,
  onCancel,
  onOk,
  afterClose,
}) => {
  const [updatedResults, setUpdatedResults] = useState<
    TournamentResults | undefined
  >();

  const handleModalAfterClose = () => {
    if (afterClose) {
      afterClose(updatedResults);
    }
  };

  return (
    <Modal
      title={tournamentResults?.title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose
      centered
      afterClose={() => handleModalAfterClose()}
      footer={null}
    >
      <ReportForm
        tournamentResults={tournamentResults}
        onOk={onOk}
        sendReportText={(updatedResults: TournamentResults) => {
          setUpdatedResults(updatedResults);
        }}
      />
    </Modal>
  );
};
