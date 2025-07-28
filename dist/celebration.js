//@ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";
export function celebrateWin() {
    console.log("You Win!!");
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}
export function showFinalResult(finalTime, finalMove, bestMoves) {
    document.getElementById("result-popup").style.display = "block";
    document.getElementById("finalTime").textContent = finalTime.toString();
    document.getElementById("finalMove").textContent = finalMove.toString();
    document.getElementById("bestMove").textContent = bestMoves.toString();
}
document.getElementById("close-popup").onclick = function () {
    document.getElementById("result-popup").style.display = "none";
};
