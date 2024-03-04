"use client";

import { OptionsMenu } from "@/components/OptionsMenu";
import { ReportTextArea } from "@/components/ReportTextArea";
import { TournamentList } from "@/components/TournamentList";
import { CreateReportModal } from "@/components/modals/CreateReportModal";
import { TournamentResultsContext } from "@/utils/context/TournamentResultsContext";
import { getTourResults } from "@/utils/getTourResults";
import { generateReportText } from "@/utils/helpers/generateReportText";
import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const VersionUpdateModal = dynamic(
  () =>
    import("@/components/modals/VersionUpdateModel").then(
      (mod) => mod.VersionUpdateModal
    ),
  {
    ssr: false,
  }
);

const Home = () => {
  const {
    tournamentResults,
    updateTournamentResults,
    isResultsUpdated,
    updateIsResultsUpdated,
  } = useContext(TournamentResultsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportText, setReportText] = useState("");

  const [modal, contextHolder] = Modal.useModal();

  const handleTournamentClick = (tournamentId: string) => {
    getTourResults(tournamentId)
      .then((data) => updateTournamentResults(data))
      .catch(() => {
        modal.error({
          title: "Ошибка!",
          content: "Турнир не существует, либо ещё не начался",
          centered: true,
        });
      });
    updateIsResultsUpdated(false);
  };

  useEffect(() => {
    if (tournamentResults && !isResultsUpdated) {
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

    if (isResultsUpdated) {
      setReportText(generateReportText(tournamentResults!));
    }
  }, [tournamentResults]);

  return (
    <div className="justify-between px-4 sm:px-6 lg:px-8 lg:flex">
      <OptionsMenu isModalOpen={isModalOpen} />
      <TournamentList onTournamentClick={handleTournamentClick} />
      <ReportTextArea reportText={reportText} />
      <CreateReportModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      <VersionUpdateModal />
      {contextHolder}
    </div>
  );
};

export default Home;
