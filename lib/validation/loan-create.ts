import { z } from "zod";

export const InfoFormSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
    .max(10),
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
    .max(20)
    .optional(),
  lastname: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
    .max(20)
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format",
    })
});

export const LoanDetailFormSchema = z.object({
  loanId: z.string().min(1, { message: "ชื่อต้องมากกว่า 1 ตัวอักษร" }).max(10),
  dueDate: z.date().default(new Date()),
  loanType: z.enum(["FIXED", "VARIABLE"]),
  paymentType: z.enum(["MONTHLY", "WEEKLY", "DAILY"]),
  firstPaymentDate: z.date(),
  loanTermType: z.string().optional(),
  loanCategory: z.enum(["NEW_LOAN", "OLD_LOAN"]),
});

export const LoanAmountFormSchema =
  z.object({
    loanAmount: z.coerce
      .number()
      .positive()
      .min(0, { message: "จำนวนเงินกู้ต้องมากกว่าหรือเท่ากับ 0" }),
    interestRate: z.coerce
      .number()
      .positive()
      .min(0)
      .max(100, { message: "อัตราดอกเบี้ยต้องอยู่ระหว่าง 0 ถึง 100" }),
    installments: z.coerce
      .number()
      .positive()
      .int()
      .min(1, { message: "จำนวนงวดต้องมากกว่าหรือเท่ากับ 1" }),
    amountPaid: z.coerce
      .number()
      .positive()
      .default(0)
      .optional(),
  autoPaymentToggle: z.boolean().optional(),
});

export const MemoFormSchema = z.object({
  additionalNote: z.string().max(100).optional(),
  tags: z.array(z.string()).optional(),
});
