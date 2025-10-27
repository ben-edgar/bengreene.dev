// This utility submits form data to a Google Apps Script webhook
// Update the GOOGLE_APPS_SCRIPT_URL with your actual deployment URL

const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

export async function submitToGoogleSheet(data: {
  name: string;
  email: string;
  comment?: string;
}): Promise<{ success: boolean; message: string }> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    // For development, just log and return success
    console.log('Form data:', data);
    return { success: true, message: 'Form submitted successfully' };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return { success: true, message: 'Form submitted successfully' };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: 'Failed to submit form. Please try again.' };
  }
}
