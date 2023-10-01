"use client";

import { OptionsMenu } from "@/components/OptionsMenu";
import { ReportTextArea } from "@/components/ReportTextArea";
import { TournamentList } from "@/components/TournamentList";
import { CreateReportModal } from "@/components/modals/CreateReportModal";
import { getTourResults } from "@/utils/getTourResults";
import { generateReportText } from "@/utils/helpers/generateReportText";
import { TournamentResults } from "@/utils/types";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedResults, setUpdatedResults] = useState<
    TournamentResults | undefined
  >();
  const [reportText, setReportText] = useState("");
  const [tournamentResults, setTournamentResults] = useState<
    TournamentResults | undefined
  >();

  const [modal, contextHolder] = Modal.useModal();

  const updateResults = (updatedResults: TournamentResults | undefined) => {
    setUpdatedResults(updatedResults);
  };

  const handleTournamentClick = (tournamentId: string) => {
    getTourResults(tournamentId)
      .then((data) => setTournamentResults(data))
      .catch(() => {
        modal.error({
          title: "Ошибка!",
          content: "Турнир не существует, либо ещё не начался",
          centered: true,
        });
      });
  };

  useEffect(() => {
    if (tournamentResults) {
      if (tournamentResults.top1.length === 0) {
        modal.error({
          title: "Ошибка!",
          content: "Турнир в процессе",
          centered: true,
        });
      } else {
        setIsModalOpen(true);
      }
    }
  }, [tournamentResults]);

  useEffect(() => {
    if (updatedResults) {
      setReportText(generateReportText(updatedResults));
    }
  }, [updatedResults]);

  return (
    <div className="w-full mx-auto justify-between transition-all duration-500 px-4 sm:px-6 lg:px-8 lg:flex lg:flex-row">
      <OptionsMenu
        tournamentResults={updatedResults!}
        onResultsChange={(updatedResults) => {
          updateResults(updatedResults);
        }}
        isModalOpen={isModalOpen}
      />
      <TournamentList onTournamentClick={handleTournamentClick} />
      <ReportTextArea reportText={reportText} />
      <CreateReportModal
        open={isModalOpen}
        tournamentResults={tournamentResults!}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => {
          setIsModalOpen(false);
        }}
        afterClose={(updatedResults: TournamentResults | undefined) => {
          updateResults(updatedResults);
        }}
      />
      {contextHolder}
    </div>
  );
};

export default Home;
