import { getSalaries, Salary } from "@/lib/salary";
import { GetStaticProps } from "next";

interface Props {
  salaries: Salary[];
}

export default function SalaryHome({ salaries }: Props) {
  return (
    <div>
      <h1>Salaries</h1>
      <ul>
        {salaries.map((salary) => (
          <li key={salary.연봉}>
            <div className="space-x-4">
              <span>{salary.연봉}</span>
              <span>{salary.월급}</span>
              <span>{salary.국민연금}</span>
              <span>{salary.건강보험}</span>
              <span>{salary.장기요양보험}</span>
              <span>{salary.고용보험}</span>
              <span>{salary.소득세?.[0]}</span>
              <span>{salary.지방세?.[0]}</span>
            </div>
          </li>
        ))}
      </ul>
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
