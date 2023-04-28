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
    장기요양보험: 12.81,
    고용보험: 0.9,
  };

  constructor(salary: number) {
    this.salary = salary;
    this.monthly = Math.floor(salary / 12);
  }

  numFormat(number: number) {
    return new Intl.NumberFormat().format(number);
  }
  calculate(number: number, rate: number) {
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
  get 장기요양보험() {
    return this.calculate(this.건강보험, this.RATE.장기요양보험);
  }
  get 고용보험() {
    return this.calculate(this.monthly, this.RATE.고용보험);
  }
}

export function getSalaries() {
  return salaries.map((salary) => {
    const s = new Salary(salary);

    return {
      연봉: s.numFormat(s.연봉),
      월급: s.numFormat(s.월급),
      국민연금: s.numFormat(s.국민연금),
      건강보험: s.numFormat(s.건강보험),
      장기요양보험: s.numFormat(s.장기요양보험),
      고용보험: s.numFormat(s.고용보험),
    };
  });
}
