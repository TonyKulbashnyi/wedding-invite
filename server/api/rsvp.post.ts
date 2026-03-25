export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.telegramToken as string | undefined;
  const chatId = config.telegramChatId as string | undefined;

  if (!token || !chatId) {
    console.error('[rsvp] Missing Telegram credentials. token:', !!token, 'chatId:', !!chatId);
    throw createError({ statusCode: 500, message: 'Missing Telegram credentials' });
  }

  const body = await readBody<{ message: string }>(event);

  if (!body?.message) {
    throw createError({ statusCode: 400, message: 'Missing message' });
  }

  try {
    await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: body.message,
        parse_mode: 'HTML',
      },
    });
  } catch (err: unknown) {
    console.error('[rsvp] Telegram API error:', err);
    throw createError({ statusCode: 500, message: 'Telegram API error' });
  }

  return { ok: true };
});
