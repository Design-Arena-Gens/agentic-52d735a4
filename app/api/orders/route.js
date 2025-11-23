import { NextResponse } from "next/server";

function validateOrder(payload) {
  if (!payload?.customer) return "Missing customer details.";
  if (!payload.customer.name) return "Customer name is required.";
  if (!payload.customer.email) return "Customer email is required.";
  if (!payload.customer.phone) return "Customer phone is required.";
  if (!payload?.order?.primaryItem) return "Missing primary order item.";
  if (!payload.order.primaryItem.quantity) return "Quantity is required.";
  return null;
}

export async function POST(request) {
  const data = await request.json();
  const validationError = validateOrder(data);

  if (validationError) {
    return NextResponse.json(
      { error: validationError },
      { status: 400 }
    );
  }

  const orderId = `ORD-${Date.now().toString().slice(-8)}`;

  return NextResponse.json(
    {
      orderId,
      receivedAt: new Date().toISOString(),
      message:
        "Order captured. Atlas Print Studio will follow up with production proof shortly.",
    },
    { status: 201 }
  );
}
