#!/bin/zsh
# Watches for the simulation to complete, then runs sync-tiers, build, commit, push, deploy
set -e

SIM_FILE="/Volumes/SSD-M2/Home/andrefernandes/Documents/ChampionsLab/src/lib/simulation-data.ts"
MARKER_TIME=$(date +%s)

echo "=== Watching for simulation to complete ==="
echo "=== Will detect when simulation-data.ts is updated ==="

while true; do
  if [[ -f "$SIM_FILE" ]]; then
    FILE_MOD=$(stat -f %m "$SIM_FILE" 2>/dev/null || echo 0)
    if (( FILE_MOD > MARKER_TIME )); then
      echo ""
      echo "=== Simulation complete! simulation-data.ts updated ==="
      break
    fi
  fi
  sleep 30
done

cd /Volumes/SSD-M2/Home/andrefernandes/Documents/ChampionsLab

echo "=== Step 1: Sync tiers ==="
npx tsx scripts/sync-tiers.ts

echo "=== Step 2: Local build ==="
npm run build

echo "=== Step 3: Git commit & push ==="
git add -A
git commit -m "Run 2M simulation: update tiers, simulation data, and winning teams

- 2,000,000 battle simulation completed
- Tier rankings recalculated from simulation + tournament data
- Added 6 winning teams featuring Tauros and Castform
- simulation-data.ts fully regenerated with fresh ELO/win rates"
git push

echo "=== Step 4: Deploy to VPS ==="
VPS_PASS=$(cat ~/Downloads/vps.txt)
VPS_IP=$(cat ~/Downloads/vpsaddress.txt)
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no andre@"$VPS_IP" \
  "cd /srv/championslab && git checkout -- . && git pull && npm run build && echo $VPS_PASS | sudo -S systemctl restart championslab"

echo ""
echo "════════════════════════════════════════════════════════"
echo "  FULL PIPELINE COMPLETE!"
echo "  - Simulation data updated"
echo "  - Tiers synced"  
echo "  - Built & deployed to VPS"
echo "════════════════════════════════════════════════════════"
