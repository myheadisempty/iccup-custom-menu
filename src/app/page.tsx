"use client";

import IconDiscord from "@/components/icons/IconDiscord";
import { OptionsMenu } from "@/components/OptionsMenu";
import { ReportTextArea } from "@/components/ReportTextArea";
import { TournamentList } from "@/components/TournamentList";
import { CreateReportModal } from "@/components/modals/CreateReportModal";
import { getTourData } from "@/utils/getTourData";
import {
  Button,
  Divider,
  FloatButton,
  Modal,
  notification,
  Select,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import useTournamentStore from "@/store/tournamentStore";
import { useCache } from "@/store/cacheStore";
import IconMenu2Fill from "@/components/icons/IconMenu2Fill";
import { useFinishedToursStore } from "@/store/finishedToursStore";
import useRoleStore from "@/store/roleStore";
import { TournamentSearch } from "@/components/TournamentSearch";

const Home = () => {
  const { setTournamentData } = useTournamentStore();
  const { getCache, setCache } = useCache();
  const { fetchFinishedTours, tournamentList, loading } =
    useFinishedToursStore();
  const { role } = useRoleStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [modal, modalContextHolder] = Modal.useModal();
  const [api, notificationContextHolder] = notification.useNotification();

  useEffect(() => {
    fetchFinishedTours(role).catch((error) =>
      openErrorNotification(error.message)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFinishedTours, role]);

  const openErrorNotification = (error: string) => {
    api.error({
      message: "Не удалось своровать данные о турнирах",
      description: `Сообщение ошибки: ${error}`,
      showProgress: true,
    });
  };

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
      {notificationContextHolder}
      <div className="flex h-12 px-2 justify-between items-center border-b-1 z-10 border-b-divider-light lg:hidden">
        <Button
          icon={<IconMenu2Fill />}
          className="text-sm"
          type="text"
          size="large"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Опции
        </Button>
        <Select
          popupMatchSelectWidth={false}
          size="large"
          className="[&_.ant-select-selector]:text-sm"
          variant="borderless"
          loading={loading}
          classNames={{
            popup: {
              root: "w-11/12 -translate-x-1/2 left-1/2",
            },
          }}
          defaultValue="Выбери турнир"
          onSelect={(value) => handleTournamentSelect(value)}
          popupRender={(menu) => (
            <>
              <TournamentSearch onSearch={handleTournamentSelect} />
              <Divider style={{ margin: "8px 0" }} />
              {menu}
            </>
          )}
          options={tournamentList.map((tournament) => ({
            value: tournament.id,
            label: tournament.title,
          }))}
        />
      </div>
      {isSidebarOpen && (
        <div className="fixed z-40 bg-[#0009] transition-opacity duration-[.5s] top-0 left-0 right-0 bottom-0" />
      )}
      <OptionsMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-col 2xl:pl-[calc((100vw-var(--spacing-screen-max-width))/2+var(--spacing-sidebar-width-small))] lg:pl-[320px]">
        <div className="pt-6 px-6 md:px-8 2xl:pl-8">
          <div className="flex lg:flex-col-reverse xl:flex-row">
            <ReportTextArea />
            <TournamentList onTournamentSelect={handleTournamentSelect} />
          </div>
        </div>
      </div>
      <CreateReportModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      {modalContextHolder}
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
