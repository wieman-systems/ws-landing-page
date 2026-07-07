#!/usr/bin/env bash
# PostToolUse(Edit|Write) hook — auto-fix the just-edited TS/TSX file with the
# project's own ESLint. Non-blocking: never fails an edit, only tidies it.
# Reads the Claude Code hook payload (JSON) on stdin.
set -o pipefail 2>/dev/null || true
cd "$(dirname "$0")/../.." || exit 0   # -> repo root, regardless of hook cwd

# Extract the edited file path from the hook stdin JSON (node is always present).
f=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);process.stdout.write((j.tool_response&&j.tool_response.filePath)||(j.tool_input&&j.tool_input.file_path)||"")}catch(e){}})')

case "$f" in
  *.ts|*.tsx) npx --no-install eslint --fix "$f" >/dev/null 2>&1 || true ;;
esac
exit 0
