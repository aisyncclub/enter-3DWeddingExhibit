const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-session-id",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AI_API_TOKEN = Deno.env.get("AI_API_TOKEN_3c573febaaeb");
    if (!AI_API_TOKEN) throw new Error("AI_API_TOKEN is not configured");

    const { groomName, brideName, fullDate, hall, storyHint } = await req.json();

    const systemPrompt = `당신은 한국 웨딩 청첩장 전문 카피라이터입니다.
감성적이고 아름다운 한국어 문장을 작성하며, 과하지 않고 절제된 서정적 표현을 사용합니다.
반드시 JSON 형식으로만 응답하세요.`;

    const userPrompt = `다음 커플의 청첩장 문구를 작성해 주세요.

신랑: ${groomName}
신부: ${brideName}
예식일: ${fullDate}
예식장: ${hall}
${storyHint ? `커플 이야기 힌트: ${storyHint}` : ''}

다음 JSON 구조로 정확히 응답해 주세요:
{
  "introLines": [
    "첫 번째 문장",
    "두 번째 문장",
    "",
    "네 번째 문장",
    "다섯 번째 문장"
  ],
  "story": [
    { "num": "01", "title": "챕터 제목", "sub": "시간과 장소 (예: 2022년 가을)", "text": "2~3문장의 짧은 에피소드 서사" },
    { "num": "02", "title": "챕터 제목", "sub": "시간과 장소", "text": "2~3문장의 짧은 에피소드 서사" },
    { "num": "03", "title": "챕터 제목", "sub": "시간과 장소", "text": "2~3문장의 짧은 에피소드 서사" },
    { "num": "04", "title": "챕터 제목", "sub": "시간과 장소", "text": "2~3문장의 짧은 에피소드 서사" }
  ]
}

규칙:
- introLines는 정확히 5개 항목 (빈 문자열 "" 하나 포함)
- story는 정확히 4개 챕터
- idx 필드 없이 위 구조 그대로
- JSON 외 다른 텍스트 없이 JSON만 응답`;

    const response = await fetch("https://api.enter.pro/code/api/v1/ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-Session-ID": crypto.randomUUID(),
      },
      body: JSON.stringify({
        model: "minimax/minimax-m3",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
        max_tokens: 1500,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "AI 서비스 오류가 발생했습니다.";
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.error?.message || errorMessage;
      } catch { /* use default */ }
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";

    // parse JSON from AI response
    let parsed;
    try {
      // strip markdown code fences if present
      const clean = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      return new Response(JSON.stringify({ error: "AI 응답을 파싱할 수 없습니다. 다시 시도해 주세요." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // add idx fields to story
    if (parsed.story) {
      parsed.story = parsed.story.map((ch: Record<string, unknown>, i: number) => ({ ...ch, idx: i + 1 }));
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
