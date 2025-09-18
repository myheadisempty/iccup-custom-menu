import { calculateAwards } from "@/utils/helpers/calculateAwards";
import { Button, Checkbox, Form, InputNumber, Select, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import dotaAwards from "../../../reward-configs/dota-tours-rewards.json";
import customAwards from "../../../reward-configs/custom-tours-rewards.json";
import useRoleStore from "@/store/roleStore";
import useTournamentStore from "@/store/tournamentStore";

interface ReportFormProps {
  onOk: () => void;
}

interface FormValues {
  thirdPlace: string;
  technicalLosses: number;
}

type SelectOptions = Array<{
  value: string;
  label: string;
}>;

export const ReportForm: FC<ReportFormProps> = ({ onOk }) => {
  const [form] = Form.useForm();
  const [isThirdPlaceSkipped, setIsThirdPlaceSkipped] = useState(false);
  const [selectOptions, setSelectOptions] = useState<SelectOptions>([]);

  const { tournamentData, setTournamentResults } = useTournamentStore();

  const { role } = useRoleStore();

  useEffect(() => {
    if (selectOptions.length === 1) {
      form.setFieldsValue({ thirdPlace: selectOptions[0].value });
    }
  }, [form, selectOptions]);

  useEffect(() => {
    const options = getThirdPlaceOptions();
    if (options.length === 0) {
      setIsThirdPlaceSkipped(true);
    }
    setSelectOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentData?.winners]);

  if (!tournamentData) return null;

  const { participantStats, tourType, title, numOfRounds, winners } =
    tournamentData;

  const prepareThirdPlace = (value: string) => {
    if (isThirdPlaceSkipped) return [];
    return value.split(",");
  };

  const prepareTournamentResults = (values: FormValues) => {
    const { technicalLosses, thirdPlace } = values;
    const confirmedParticipants = participantStats.confirmed - technicalLosses;

    const awardsConfig = role === "custom" ? customAwards : dotaAwards;

    return {
      ...tournamentData,
      participantStats: {
        ...participantStats,
        technicalLosses,
      },
      awards: calculateAwards(
        awardsConfig,
        tourType,
        confirmedParticipants,
        title,
        numOfRounds - 1
      ),
      winners: {
        ...winners,
        thirdPlace: prepareThirdPlace(thirdPlace),
      },
    };
  };

  const handleSubmit = (values: FormValues) => {
    form.validateFields();
    const tournamentResults = prepareTournamentResults(values);
    setTournamentResults(tournamentResults);
    onOk();
  };

  const getThirdPlaceOptions = () => {
    const formatLabel = (values: string[]) => values.join(" & ");
    const { candidate1, candidate2 } = winners.thirdPlaceCandidates;

    const options: SelectOptions = [];

    if (candidate1.length > 0) {
      options.push({
        value: candidate1.join(","),
        label: formatLabel(candidate1),
      });
    }

    if (candidate2.length > 0) {
      options.push({
        value: candidate2.join(","),
        label: formatLabel(candidate2),
      });
    }

    return options;
  };

  const playerOrTeam = tourType === "1x1" ? "игрока" : "команду";

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Количество тех. лузов"
        name="technicalLosses"
        rules={[
          {
            required: true,
            message: "Количество тех. лузов не может быть пустым!",
          },
        ]}
        initialValue={0}
      >
        <InputNumber
          min={0}
          max={participantStats.confirmed - 4}
          className="w-full"
        />
      </Form.Item>

      <Form.Item>
        <Tooltip
          title={
            selectOptions.length === 0
              ? "Нет игроков на 3-м месте. Чекбокс проставлен автоматически"
              : null
          }
          placement="left"
        >
          <Checkbox
            checked={isThirdPlaceSkipped}
            disabled={selectOptions.length === 0}
            onChange={() => setIsThirdPlaceSkipped(!isThirdPlaceSkipped)}
          >
            Без 3-го места
          </Checkbox>
        </Tooltip>
      </Form.Item>

      {!isThirdPlaceSkipped && (
        <Form.Item
          label={`Выбери ${playerOrTeam}, занявш${
            tourType === "1x1" ? "его" : "ую"
          } 3 место`}
          name="thirdPlace"
          rules={[{ required: true, message: `Выбери ${playerOrTeam}!` }]}
        >
          <Select options={selectOptions} />
        </Form.Item>
      )}

      <Form.Item className="m-0">
        <Button type="primary" htmlType="submit">
          Подтвердить
        </Button>
      </Form.Item>
    </Form>
  );
};
