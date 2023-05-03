import { getSalaries, Salary } from "@/lib/salary";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useMemo, useState } from "react";

interface Props {
  salaries: Salary[];
}

export default function Salary2023({ salaries }: Props) {
  const [familyCount, setFamilyCount] = useState(1);

  const changeFamilyCount: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const value = Number(e.target.value);
    setFamilyCount(value);
  };

  const familyCountIndex = useMemo(() => {
    return familyCount - 1;
  }, [familyCount]);

  return (
    <div className="p-8 bg-gray-200 shadow-lg rounded-md">
      <Head>
        <title>2023 실수령액</title>
        <meta
          name="description"
          content="2023년도 실수령액 정보와 각 월소득 별 4대보험 예상공제액을 확인 할 수 있습니다."
        />

        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="2023 실수령액"></meta>
        <meta
          property="og:description"
          content="2023년도 실수령액을 확인 할 수 있습니다."
        ></meta>
        {/* <meta
          property="og:image"
          content="https://www.pnja.or.kr/icons/thumbnail.png"
        ></meta>
        <meta property="og:url" content="https://www.pnja.or.kr"></meta> */}
      </Head>

      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold">2023 실수령액 💰</h1>

        <div className="space-x-2">
          <label>부양가족 (본인포함)</label>
          <select className="focus:outline-none" value={familyCount} onChange={changeFamilyCount}>
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="mt-10 w-[1100px]">
        <colgroup>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
          <col style={{ width: "120px", minWidth: "100px" }}></col>
        </colgroup>

        <thead className="sticky top-4 bg-gray-300 h-10">
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
            <tr key={salary.연봉} className="h-10 even:bg-gray-100">
              <td>
                <span>{salary.연봉}</span>
              </td>
              <td>
                <span>{salary.월급}</span>
              </td>
              <td>
                <span>{salary.실수령액?.[familyCountIndex]}</span>
              </td>
              <td>
                <span>{salary.공제합계?.[familyCountIndex]}</span>
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
                <span>{salary.소득세?.[familyCountIndex]}</span>
              </td>
              <td>
                <span>{salary.지방세?.[familyCountIndex]}</span>
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
