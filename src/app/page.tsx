"use client";

import IconDiscord from "@/components/icons/IconDiscord";
import { OptionsMenu } from "@/components/OptionsMenu";
import { ReportTextArea } from "@/components/ReportTextArea";
import { TournamentList } from "@/components/TournamentList";
import { CreateReportModal } from "@/components/modals/CreateReportModal";
import { getTourData } from "@/utils/getTourData";
import { FloatButton, Modal, Spin } from "antd";
import { useState } from "react";
import useTournamentStore from "@/store/tournamentStore";
import { useCache } from "@/store/cacheStore";

const Home = () => {
  const { setTournamentData } = useTournamentStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [modal, contextHolder] = Modal.useModal();

  const { getCache, setCache } = useCache();

  const openErrorModal = (error: string) => {
    modal.error({
      title: "Ошибка!",
      content: error,
      centered: true,
    });
  };

  const handleTournamentSelect = (tournamentId: string) => {
    setSpinning(true);

    const cachedData = getCache(tournamentId);

    if (cachedData) {
      setTournamentData(cachedData);

      setIsModalOpen(true);

      setSpinning(false);
      return;
    }

    getTourData(tournamentId)
      .then((data) => {
        setTournamentData(data);

        if (data.winners.firstPlace.length === 0) {
          openErrorModal("Турнир в процессе");
        } else {
          setCache(tournamentId, data, 120);
          setIsModalOpen(true);
        }
      })
      .catch(() => openErrorModal("Турнир не существует, либо ещё не начался"))
      .finally(() => setSpinning(false));
  };

  return (
    <>
      <div className="justify-between mt-5 mx-4 lg:mx-8 sm:mx-6 xl:flex">
        <OptionsMenu />
        <TournamentList onTournamentSelect={handleTournamentSelect} />
        <ReportTextArea />
      </div>
      <CreateReportModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      {contextHolder}
      <Spin spinning={spinning} size="large" fullscreen />
      <FloatButton
        icon={<IconDiscord />}
        tooltip={
          <span>
            По вопросам исправлений и предложений, обращайтесь в Discord:
            dora1338
          </span>
        }
      />
    </>
  );
};

export default Home;
