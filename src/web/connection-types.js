import { $ } from './dom.js';

const STUDIO = 'google-ai-studio';
const STUDIO_URL = 'https://generativelanguage.googleapis.com/v1beta/openai';

export const KINDS = [
  ['codex', 'Codex 订阅 / CLI'], ['claude', 'Claude Code CLI'], ['grok-build', 'Grok Build 订阅 / CLI'],
  [STUDIO, 'Google AI Studio'],
  ['openai-compatible', 'OpenAI 兼容 API / 中转站'], ['anthropic-compatible', 'Anthropic 兼容 API / 中转站'],
  ['vertex-ai', 'Google Vertex AI'], ['minimax', 'MiniMax TTS'], ['elevenlabs', 'ElevenLabs TTS'],
  ['gpt-sovits', '本地 GPT-SoVITS'], ['edge-tts', '免费 Edge TTS'], ['whisper-local', '本地 Whisper STT'],
  ['memory-http', '外置记忆 HTTP'], ['memory-mcp', '外置记忆 MCP（记忆 + 工具）'],
  ['novelai', 'NovelAI 生图'], ['comfyui', '本地 / 远程 ComfyUI'],
  ['mcp-remote', '远程 MCP（HTTP）'], ['mcp-stdio', '本机 MCP（stdio）'],
];

export function displayKind(connection) {
  if (connection?.kind === 'openai-compatible' && connection.options?.apiStyle !== 'responses'
    && connection.baseUrl?.replace(/\/+$/u, '') === STUDIO_URL) return STUDIO;
  return connection?.kind || 'openai-compatible';
}

export function transportKind(selection) {
  return selection === STUDIO ? 'openai-compatible' : selection;
}

export function showConnectionType(changed = false) {
  const kind = $('#connection-kind').value;
  const studio = kind === STUDIO;
  const url = $('#connection-url');
  const name = $('#connection-name');
  if (changed && url.readOnly && !studio) {
    url.value = '';
    if (name.value === 'Google AI Studio') name.value = '';
  }
  url.readOnly = studio;
  $('#connection-auth-type').disabled = studio;
  $('#connection-auth-name').disabled = studio;
  $('#connection-api-format').hidden = kind !== 'openai-compatible';
  if (studio) {
    if (!name.value.trim()) name.value = 'Google AI Studio';
    url.value = STUDIO_URL;
    $('#connection-api-style').value = 'chat-completions';
    $('#connection-auth-type').value = 'bearer';
    $('#connection-auth-name').value = '';
    $('#connection-url-help').textContent = '在下方「密钥」填入 Google AI Studio API Key，再保存连接。';
  } else {
    $('#connection-url-help').textContent = kind === 'vertex-ai'
      ? 'Gemini 4 Argon 使用 global 发布者地址。API Key 选 Google x-goog-api-key，OAuth access token 选 Bearer。'
      : 'API 与远程 MCP 填服务地址；CLI 与本机命令留空。';
  }
}
