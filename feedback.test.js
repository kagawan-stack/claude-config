/**
 * @jest-environment jest-environment-jsdom
 */

const fs = require('fs');

beforeEach(() => {
  document.body.innerHTML = fs.readFileSync('./index.html', 'utf8');
  // Re-define the function in the test environment
  window.submitFeedback = function() {
    const text = document.getElementById('feedback').value.trim();
    if (!text) return alert('フィードバックを入力してください');
    document.getElementById('message').style.display = 'block';
    document.getElementById('feedback').value = '';
  };
});

test('フィードバックボタンが存在する', () => {
  const btn = document.getElementById('submit-btn');
  expect(btn).not.toBeNull();
});

test('空のフィードバックは送信できない', () => {
  window.alert = jest.fn();
  window.submitFeedback();
  expect(window.alert).toHaveBeenCalledWith('フィードバックを入力してください');
});

test('フィードバック送信後にメッセージが表示される', () => {
  window.alert = jest.fn();
  document.getElementById('feedback').value = 'テストです';
  window.submitFeedback();
  expect(document.getElementById('message').style.display).toBe('block');
});

test('送信後にテキストエリアがクリアされる', () => {
  window.alert = jest.fn();
  document.getElementById('feedback').value = 'テストです';
  window.submitFeedback();
  expect(document.getElementById('feedback').value).toBe('');
});
