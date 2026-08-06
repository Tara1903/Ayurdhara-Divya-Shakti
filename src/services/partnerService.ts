export async function validatePartnerCode(code: string, subtotal: number): Promise<{ isValid: boolean, message: string }> {
  try {
    const res = await fetch('/api/payments/partner/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { isValid: false, message: errorData?.error || 'Invalid or inactive Partner Code' };
    }
    
    return { isValid: true, message: 'Partner benefit applied successfully!' };
  } catch (error) {
    return { isValid: false, message: 'Could not validate partner code' };
  }
}
