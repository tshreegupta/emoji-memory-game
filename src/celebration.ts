//@ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";

export function celebrateWin(){
    console.log("You Win!!")
    confetti({
        particleCount: 150,
        spread: 70,
        origin: {y: 0.6}
    });

}