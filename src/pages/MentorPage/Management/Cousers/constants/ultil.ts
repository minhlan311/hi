export enum PlanEnum {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export const planOptions = [
  {
    label: 'Miễn Phí',
    value: PlanEnum.FREE,
  },
  {
    label: 'Trả Phí',
    value: PlanEnum.PREMIUM,
  },
]

export enum EducationTypeEnum {
  HIGH_SCHOOL = 'HIGH SCHOOL',
  UNIVERSITY = 'UNIVERSITY',
}
