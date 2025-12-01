const TREE_ROWS = [
    "          *          ",
    "         ***         ",
    "        *****        ",
    "       *******       ",
    "      *********      ",
    "     ***********     ",
    "    *************    ",
    "   ***************   ",
    "        |||||        ",
    "        |||||        "
];

const COLORS = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];

const LYRICS_PART_1 = [
    { text: "A face on a lover", delay: 2000 },
    { text: "With a fire in his heart", delay: 2600 },
    { text: "A man undercover", delay: 2000 },
    { text: "But you tore me apart", delay: 2500 },
    { text: "oh oh", delay: 2000 },
    { text: "oh oh", delay: 2000 },
    { text: "Now I've found a real love", delay: 1900 },
    { text: "You'll never fool me again", delay: 2000 }
];

const LYRICS_PART_2 = [
    { text: "Last Christmas", delay: 2100 },
    { text: "I gave you my heart", delay: 2000 },
    { text: "But the very next day", delay: 2000 },
    { text: "You gave it away, (You gave it away)", delay: 3000 },
    { text: "This year", delay: 2000 },
    { text: "To save me from tears", delay: 2000 },
    { text: "I'll give it to someone special", delay: 3500 },
    { text: "SPECIL!", delay: 2000 }
];


const treeOutput = document.getElementById('tree-output');
const lyricsOutput = document.getElementById('lyrics-output');
const startButton = document.getElementById('startButton');
const mainContent = document.getElementById('mainContent');
const audioElement = document.getElementById('song');

let animationIntervalId = null; 

function generateTreeHTML() {
    let treeHTML = '';
    for (const row of TREE_ROWS) {
        let lineHTML = '';
        for (const char of row) {
            if (char === '*') { 
                const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];
                lineHTML += `<span class="${colorClass}">${char}</span>`;
            } else {
                lineHTML += char;
            }
        }
        treeHTML += lineHTML + '\n';
    }
    return treeHTML;
}

function updateTree() {
    treeOutput.innerHTML = generateTreeHTML();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateSequence() {
    animationIntervalId = setInterval(updateTree, 800);
   
    for (const lyricData of LYRICS_PART_1) {
        const newLine = document.createElement('p');
        newLine.classList.add('lyric-line');
        newLine.textContent = lyricData.text;
        lyricsOutput.appendChild(newLine);
        await sleep(lyricData.delay); 
    }

    await sleep(1000); 
    lyricsOutput.innerHTML = ''; 
    
    for (const lyricData of LYRICS_PART_2) {
        const newLine = document.createElement('p');
        newLine.classList.add('lyric-line');
        newLine.textContent = lyricData.text;
        lyricsOutput.appendChild(newLine);
        await sleep(lyricData.delay); 
    }
}

startButton.addEventListener('click', async () => {
    document.getElementById('startButtonContainer').style.display = 'none';
    mainContent.style.display = 'flex';
    await sleep(500); 
    audioElement.play(); 
    animateSequence();
});
updateTree();
