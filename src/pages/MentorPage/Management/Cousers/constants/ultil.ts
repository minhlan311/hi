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

export enum TestTypeEnum {
  QUIZ = 'QUIZ',
  TEST = 'TEST',
}

export const enum ActionEnum {
  LIST = 'LIST',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

export enum ModelEnum {
  TOPIC = 'TOPIC',
  COURSE = 'COURSE',
  TEST = 'TEST',
  QUIZ = 'QUIZ',
  LESSON = 'LESSON',
}

export enum QuestionTypeEnum {
  SINGLE_CHOICE = 'SINGLE CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE CHOICE',
  TRUE_FALSE = 'TRUE FALSE',
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  APPROVED = 'APPROVED',
  UNAPPROVED = 'UNAPPROVED',
  LOCK = 'LOCK',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
