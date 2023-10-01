import { calculateReward } from "@/utils/helpers/calculateReward";
import { TournamentResults } from "@/utils/types";
import { Button, Checkbox, Form, InputNumber, Select } from "antd";
import { FC, useState } from "react";

interface ReportFormProps {
  tournamentResults: TournamentResults;
  onOk: () => void;
  sendReportText: (updatedResults: TournamentResults) => void;
}

export const ReportForm: FC<ReportFormProps> = ({
  tournamentResults,
  onOk,
  sendReportText,
}) => {
  const [form] = Form.useForm();
  const [thirdPlaceDisabled, setThirdPlaceDisabled] = useState(false);

  const onFinish = (values: {
    techLossesCount: number;
    top3: string | string[];
  }) => {
    const { techLossesCount, top3 } = values;

    form.validateFields();

    const updatedTop3 = Array.isArray(top3)
      ? top3
      : typeof top3 === "string"
      ? top3.split(",")
      : [];

    const updatedResults = {
      ...tournamentResults,
      top3: updatedTop3,
      techLossesCount: techLossesCount,
      awards: calculateReward(
        tournamentResults.tourType,
        tournamentResults.confirmedCount - techLossesCount,
        tournamentResults.title,
        tournamentResults.numOfRounds - 1
      ),
    };

    sendReportText(updatedResults);
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
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={thirdPlaceDisabled}
          onChange={() => setThirdPlaceDisabled(!thirdPlaceDisabled)}
        >
          Без 3-го места
        </Checkbox>
      </Form.Item>
      {!thirdPlaceDisabled && (
        <Form.Item
          label={`Выбери ${
            tournamentResults.tourType === "1x1"
              ? "игрока, занявшего"
              : "команду, занявшую"
          } 3 место`}
          name="top3"
          rules={[
            {
              required: true,
              message: `Выбери ${
                tournamentResults.tourType === "1x1" ? "игрока" : "команду"
              }!`,
            },
          ]}
        >
          <Select
            options={[
              {
                value: `${tournamentResults.top3_1}`,
                label: `${tournamentResults.top3_1}`.replace(/,/g, " & "),
              },
              {
                value: `${tournamentResults.top3_2}`,
                label: `${tournamentResults.top3_2}`.replace(/,/g, " & "),
              },
            ]}
          />
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
