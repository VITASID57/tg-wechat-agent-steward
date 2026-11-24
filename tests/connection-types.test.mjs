import assert from 'node:assert/strict';
import test from 'node:test';
import { KINDS, displayKind, transportKind } from '../src/web/connection-types.js';

test('saved AI Studio connections reopen under their named form type', () => {
  const baseUrl = 'https://generativelanguage.googleapis.com/v1beta/openai';
  const saved = { kind: 'openai-compatible', baseUrl, options: { apiStyle: 'chat-completions' } };
  const studio = displayKind(saved);
  assert.deepEqual(KINDS.find(([value]) => value === studio), ['google-ai-studio', 'Google AI Studio']);
  assert.equal(transportKind(studio), saved.kind);
  assert.equal(displayKind({ ...saved, baseUrl: baseUrl + '/' }), studio);
  assert.equal(displayKind({ ...saved, baseUrl: 'https://relay.test/v1beta/openai' }), saved.kind);
  assert.equal(displayKind({ ...saved, options: { apiStyle: 'responses' } }), saved.kind);
  assert.equal(displayKind({ ...saved, kind: 'vertex-ai' }), 'vertex-ai');
});
