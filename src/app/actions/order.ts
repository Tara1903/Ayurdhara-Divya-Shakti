"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/lib/repositories";
import { normalizePhone } from "@/lib/utils";

export type OrderActionState = {
  error?: string;
  orderId?: string;
  orderNumber?: string;
};

export async function submitOrderAction(
  _previousState: OrderActionState,
  formData: FormData,
): Promise<OrderActionState> {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const address = String(formData.get("address") ?? "").trim();
  const itemsRaw = String(formData.get("items") ?? "[]");

  if (!customerName || phone.length !== 10 || !address) {
    return {
      error: "Please complete your name, 10-digit phone number, and delivery address.",
    };
  }

  let items;
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    return {
      error: "Your cart data could not be read. Please refresh and try again.",
    };
  }

  if (!Array.isArray(items) || !items.length) {
    return {
      error: "Your cart is empty.",
    };
  }

  try {
    const order = await createOrder({
      customerName,
      phone,
      address,
      items,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/orders");

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "We could not place your order right now.",
    };
  }
}
