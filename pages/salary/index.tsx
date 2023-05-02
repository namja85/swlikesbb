import { getSalaries, Salary } from "@/lib/salary";
import { GetStaticProps } from "next";

interface Props {
  salaries: Salary[];
}

export default function SalaryHome({ salaries }: Props) {
  return (
    <div>
      <h1>Salaries</h1>

      <table>
        <colgroup>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
          <col style={{ width: "120px" }}></col>
        </colgroup>

        <thead>
          <tr>
            <th className="text-left">
              <span>연봉</span>
            </th>
            <th className="text-left">
              <span>월급</span>
            </th>
            <th className="text-left">
              <span>실수령(월)</span>
            </th>
            <th className="text-left">
              <span>공제합계</span>
            </th>
            <th className="text-left">
              <span>국민연금</span>
            </th>
            <th className="text-left">
              <span>건강보험</span>
            </th>
            <th className="text-left">
              <span>장기요양</span>
            </th>
            <th className="text-left">
              <span>고용보험</span>
            </th>
            <th className="text-left">
              <span>소득세</span>
            </th>
            <th className="text-left">
              <span>지방세</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.연봉}>
              <td>
                <span>{salary.연봉}</span>
              </td>
              <td>
                <span>{salary.월급}</span>
              </td>
              <td>
                <span>{salary.실수령액?.[0]}</span>
              </td>
              <td>
                <span>{salary.공제합계?.[0]}</span>
              </td>
              <td>
                <span>{salary.국민연금}</span>
              </td>
              <td>
                <span>{salary.건강보험}</span>
              </td>
              <td>
                <span>{salary.장기요양}</span>
              </td>
              <td>
                <span>{salary.고용보험}</span>
              </td>
              <td>
                <span>{salary.소득세?.[0]}</span>
              </td>
              <td>
                <span>{salary.지방세?.[0]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const salaries = getSalaries();

  return {
    props: {
      salaries,
    },
  };
};
