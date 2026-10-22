export interface PaymentRequest {
  method: "mpesa" | "cod";
  amount: number;
  phone: string;
  forceFail?: boolean;
}

export interface PaymentResult {
  success: boolean;
  receiptNumber?: string;
  errorMessage?: string;
}

export interface PaymentProvider {
  processPayment(req: PaymentRequest): Promise<PaymentResult>;
}

/**
 * Simulated Payment Provider for Whimsy.KE POC.
 * - M-Pesa: waits ~4 seconds to simulate Safaricom Daraja STK Push prompt on the customer's phone.
 *   Honours `forceFail` (via ?pay=fail or the Dev Demo Panel) so stakeholders can test error & retry states.
 * - Cash on Delivery (COD): resolves immediately.
 */
export function generateOrderNumber(): string {
  return `WHIM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
}

export const simulatedPaymentProvider: PaymentProvider = {
  async processPayment(req: PaymentRequest): Promise<PaymentResult> {
    if (req.method === "cod") {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return {
        success: true,
        receiptNumber: `COD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      };
    }

    // M-Pesa STK Push simulation (~3.8 seconds)
    await new Promise((resolve) => setTimeout(resolve, 3800));

    if (req.forceFail) {
      return {
        success: false,
        errorMessage:
          "Pole! The M-Pesa STK prompt on your phone timed out or was cancelled (Request cancelled by user). No funds were deducted.",
      };
    }

    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      success: true,
      receiptNumber: `QJK${randomCode}`,
    };
  },
};
