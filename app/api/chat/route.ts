import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

const SYSTEM_PROMPT = `Você é o Foquinha, assistente virtual simpático e prestativo da Foca Marketing.

Sobre a Foca Marketing:
A Foca Marketing é uma agência digital apaixonada por transformar negócios. Acreditamos que toda empresa tem o potencial de crescer de forma extraordinária — e nossa missão é ser o parceiro estratégico que torna isso possível. Com uma equipe completa e dedicada, unimos criatividade, tecnologia e dados para criar soluções que realmente movem o ponteiro. Porque quando você cresce, crescemos juntos.

Serviços oferecidos:
- Tráfego Pago: Campanhas no Google, Meta e outras plataformas para gerar leads e vendas
- Desenvolvimento Web: Sites e landing pages modernos, rápidos e focados em conversão
- Automação & IA: Soluções inteligentes para automatizar processos e potencializar resultados
- Social Media: Gestão estratégica de redes sociais com conteúdo que engaja e converte
- Design Gráfico: Identidade visual, materiais e peças que comunicam com impacto
- Copywriting: Textos estratégicos que vendem e conectam com o público certo

Informações de contato:
- Email: foca.marketing@gmail.com
- Telefone/WhatsApp: (21) 99417-6751
- Localização: São Paulo, SP
- Instagram: @focamarketing

Instruções de comportamento:
- Responda sempre em português brasileiro de forma natural e acolhedora
- Seja simpático, entusiasmado e objetivo — transmita confiança
- Para dúvidas sobre erros no site, peça ao usuário para descrever o problema e sugira entrar em contato pelo WhatsApp ou email
- Se não souber responder algo, seja honesto e sugira falar com a equipe via WhatsApp
- Quando o usuário quiser falar com um atendente humano, informe que há um botão "Falar com atendente humano" no chat
- Mantenha respostas concisas — o cliente quer ler rápido, não um manual
- NUNCA use markdown: sem asteriscos, negrito, *, #. Texto puro apenas
- Quando listar itens (ex: serviços), coloque cada item em uma linha separada com uma quebra de linha. Formato: "→ Nome: descrição curtíssima de até 6 palavras". Sem introdução longa antes da lista
- Ao listar serviços, mencione apenas o nome e o benefício principal em poucas palavras — sem repetir frases como "para gerar leads" em todos os itens
- Depois da lista, uma frase curta de encerramento e convite para continuar a conversa`;

interface Message {
  role: "user" | "model";
  content: string;
}

// Simple in-memory rate limiter: max 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          reply:
            "Muitas mensagens em pouco tempo. Aguarde um momento e tente novamente.",
        },
        { status: 429 }
      );
    }

    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { reply: "Nenhuma mensagem recebida." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { reply: "Mensagem inválida." },
        { status: 400 }
      );
    }
    
    if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY não definida");
  return NextResponse.json(
    { reply: "Erro de configuração do servidor." },
    { status: 500 }
  );
}

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // Gemini exige que o contents comece com "user" — ignora mensagens "model" iniciais (boas-vindas)
    const firstUserIdx = messages.findIndex((m) => m.role === "user");
    const contents = (firstUserIdx === -1 ? messages : messages.slice(firstUserIdx)).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const geminiStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of geminiStream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("[/api/chat] Erro:", error);
    return NextResponse.json(
      {
        reply: "Ops, tive um problema técnico. Tente novamente ou fale com a gente pelo WhatsApp!",
      },
      { status: 500 }
    );
  }
}
