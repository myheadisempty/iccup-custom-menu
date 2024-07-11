import { TournamentResultsContext } from "@/utils/context/TournamentResultsContext";
import { calculateReward } from "@/utils/helpers/calculateReward";
import { Button, Checkbox, Form, InputNumber, Select, Space } from "antd";
import { FC, useContext, useState } from "react";

interface ReportFormProps {
  onOk: () => void;
}

interface AwardsValues {
  top1: number;
  top2: number;
  top3: number;
}

export const ReportForm: FC<ReportFormProps> = ({ onOk }) => {
  const [form] = Form.useForm();
  const [thirdPlaceEnabled, setThirdPlaceEnabled] = useState(false);
  const [changeRewardsEnabled, setChangeRewardsEnabled] = useState(false);

  const { tournamentResults, updateTournamentResults, updateIsResultsUpdated } =
    useContext(TournamentResultsContext);

  const onFinish = (values: {
    techLossesCount: number;
    top3: string | string[];
    awards?: AwardsValues;
  }) => {
    const { techLossesCount, top3, awards } = values;
    const rewardsArray = awards && [awards.top1, awards.top2, awards.top3];

    form.validateFields();

    const updatedTop3 = Array.isArray(top3) ? top3 : top3.split(",");

    const updatedResults = {
      ...tournamentResults!,
      top3: updatedTop3,
      techLossesCount,
      awards: rewardsArray
        ? rewardsArray
        : calculateReward(
            tournamentResults!.tourType,
            tournamentResults!.confirmedCount - techLossesCount,
            tournamentResults!.title,
            tournamentResults!.numOfRounds - 1
          ),
    };

    updateTournamentResults(updatedResults);
    updateIsResultsUpdated(true);
    onOk();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Количество тех. лузов"
        name="techLossesCount"
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
          max={tournamentResults!.confirmedCount - 4}
          className="w-full"
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={thirdPlaceEnabled}
          onChange={() => setThirdPlaceEnabled(!thirdPlaceEnabled)}
        >
          Без 3-го места
        </Checkbox>
      </Form.Item>
      {!thirdPlaceEnabled && (
        <Form.Item
          label={`Выбери ${
            tournamentResults!.tourType === "1x1"
              ? "игрока, занявшего"
              : "команду, занявшую"
          } 3 место`}
          name="top3"
          rules={[
            {
              required: true,
              message: `Выбери ${
                tournamentResults!.tourType === "1x1" ? "игрока" : "команду"
              }!`,
            },
          ]}
        >
          <Select
            options={[
              {
                value: `${tournamentResults!.top3_1}`,
                label: `${tournamentResults!.top3_1}`.replace(/,/g, " & "),
              },
              {
                value: `${tournamentResults!.top3_2}`,
                label: `${tournamentResults!.top3_2}`.replace(/,/g, " & "),
              },
            ]}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Checkbox
          checked={changeRewardsEnabled}
          onChange={() => setChangeRewardsEnabled(!changeRewardsEnabled)}
        >
          Изменить награды
        </Checkbox>
      </Form.Item>
      {changeRewardsEnabled && (
        <Form.Item>
          <div className="flex justify-between space-x-10">
            {["top1", "top2", "top3"].map((place, index) => (
              <Form.Item
                key={place}
                label={`${index + 1} место`}
                name={["awards", place]}
                initialValue={0}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            ))}
          </div>
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
