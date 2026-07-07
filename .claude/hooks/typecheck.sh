#!/usr/bin/env bash
# Stop hook — typecheck the project once when Claude finishes a turn.
# Non-blocking: surfaces type errors as a systemMessage but never traps the turn
# in a loop (pre-existing errors won't wedge the session).
cd "$(dirname "$0")/../.." || exit 0   # -> repo root, regardless of hook cwd

out=$(npx --no-install tsc --noEmit 2>&1)
if [ $? -ne 0 ]; then
  node -e 'const m=process.argv[1]||"";process.stdout.write(JSON.stringify({systemMessage:"tsc --noEmit reported type errors (not blocking):\n"+m.split("\n").filter(Boolean).slice(0,20).join("\n")}))' "$out"
fi
exit 0
