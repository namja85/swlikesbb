import incomeTaxJson from "./income-tax.json";

type IncomeTax = typeof incomeTaxJson;

const incomeTax: IncomeTax = incomeTaxJson;

const salaryList = [
  { start: 10_000_000, end: 200_000_000, delta: 1_000_000 },
  { start: 220_000_000, end: 500_000_000, delta: 20_000_000 },
];

const salaries = salaryList.reduce((acc, cur) => {
  return [
    ...acc,
    ...Array.from(
      { length: Math.floor((cur.end - cur.start) / cur.delta) + 1 },
      (_, i) => cur.start + cur.delta * i
    ),
  ];
}, [] as number[]);

export class Salary {
  salary: number;
  monthly: number;

  RATE = {
    국민연금: 4.5,
    건강보험: 3.545,
    장기요양: 12.81, // 건강보험 기준
    고용보험: 0.9,
    지방세: 10, // 소득세 기준
  };

  constructor(salary: number) {
    this.salary = salary;
    this.monthly = Math.floor(salary / 12);
  }

  numFormat(number: number) {
    return new Intl.NumberFormat().format(number);
  }
  calculate(number: number, rate: number = 100) {
    return Math.floor((number * rate) / 1000) * 10;
  }

  get 연봉() {
    return this.salary;
  }
  get 월급() {
    return this.monthly;
  }
  get 국민연금() {
    return this.calculate(this.monthly, this.RATE.국민연금);
  }
  get 건강보험() {
    return this.calculate(this.monthly, this.RATE.건강보험);
  }
  get 장기요양() {
    return this.calculate(this.건강보험, this.RATE.장기요양);
  }
  get 고용보험() {
    return this.calculate(this.monthly, this.RATE.고용보험);
  }
  get 소득세() {
    if (this.monthly > 10_000_000) {
      const getCb = (monthly: number) => {
        if (monthly > 87_000_000) {
          return 31_034_600 + (monthly - 87_000_000) * 0.45;
        }
        if (monthly > 45_000_000 && monthly <= 87_000_000) {
          return 13_394_600 + (monthly - 45_000_000) * 0.42;
        }
        if (monthly > 30_000_000 && monthly <= 45_000_000) {
          return 7_394_600 + (monthly - 30_000_000) * 0.4;
        }
        if (monthly > 28_000_000 && monthly <= 30_000_000) {
          return 6_610_600 + (monthly - 28_000_000) * 0.98 * 0.4;
        }
        if (monthly > 14_000_000 && monthly <= 28_000_000) {
          return 1_397_000 + (monthly - 14_000_000) * 0.98 * 0.38;
        }
        return 25_000 + (monthly - 10_000_000) * 0.98 * 0.35;
      };

      return incomeTax
        .at(-1)
        ?.slice(2)
        .map((e) => this.calculate(e + getCb(this.monthly)));
    }
    if (this.monthly === 10_000_000) {
      return incomeTax
        .at(-1)
        ?.slice(2)
        .map((e) => this.calculate(e));
    }
    for (let i = 0; i < incomeTax.length - 1; i++) {
      const stdMonthly = (incomeTax[i][0] as number) * 1000;
      if (this.monthly < stdMonthly) {
        return incomeTax[i + 1].slice(2).map((e) => this.calculate(e));
      }
    }
    return [];
  }
  get 지방세() {
    return this.소득세?.map((e) => this.calculate(e, this.RATE.지방세));
  }
  get 공제합계() {
    const tmpTotal =
      this.국민연금 + this.건강보험 + this.장기요양 + this.고용보험;

    return this.소득세?.map((e, i) => tmpTotal + e + (this.지방세?.[i] ?? 0));
  }
  get 실수령액() {
    return this.공제합계?.map((e) => this.monthly - e);
  }
}

export function getSalaries() {
  return salaries.map((salary) => {
    const s = new Salary(salary);

    return {
      연봉: s.numFormat(s.연봉),
      월급: s.numFormat(s.월급),
      실수령액: s.실수령액?.map((e) => s.numFormat(e)),
      공제합계: s.공제합계?.map((e) => s.numFormat(e)),
      국민연금: s.numFormat(s.국민연금),
      건강보험: s.numFormat(s.건강보험),
      장기요양: s.numFormat(s.장기요양),
      고용보험: s.numFormat(s.고용보험),
      소득세: s.소득세?.map((e) => s.numFormat(e)),
      지방세: s.지방세?.map((e) => s.numFormat(e)),
    };
  });
}
