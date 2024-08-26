let matrix = [];
let rows = 20;
let columns = 20;
let isPlaying = false;
let intervalId;

const el = document.querySelector(".grid-container");

for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {
        matrix[i][j] = 0;
        // matrix[i][j] = Math.floor(Math.random() * 2); //for randomnes //для рандома 
        
    }
}

//display grid //відображає 
function renderGrid() {
    el.innerHTML = '';
    for (let k = 0; k < matrix.length; k++) {
        const container = document.createElement("div");
        container.className = "grid-line-container";
        
        for (let l = 0; l < matrix[k].length; l++) {
            const child = document.createElement("div");
            if(matrix[k][l] == 1){
                child.className = "grid-item-filled";
            }
            else{
                child.className = "grid-item";
            }
            container.appendChild(child);
            el.appendChild(container);
        }                   
       
        
    }
    console.log(matrix.length);
}

//count Neighbors // рахує сусідні клітинки
function countNeighbors(matrix, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let ni = x + i;
            let nj = y + j;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < columns) {
                count += matrix[ni][nj];
                console.log(matrix[ni][nj]+"["+ni+"]["+nj+"]")
            }
            
        }
        
    }
    return count;
    
}

//*new generation* // *створює наступну генерацію*
function updateGrid() {
    let newMatrix = [];
    for (let i = 0; i < rows; i++) {
        newMatrix[i] = [];
        for (let j = 0; j < columns; j++) {
            let liveNeighbors = countNeighbors(matrix, i, j);
            if (matrix[i][j] === 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newMatrix[i][j] = 0; // помирає 
                } else {
                    newMatrix[i][j] = 1; // живе
                }
            } else {
                if (liveNeighbors === 3) {
                    newMatrix[i][j] = 1; // оживає
                } else {
                    newMatrix[i][j] = 0; // нічого
                }
            }
        }
    }
    matrix = newMatrix;
    renderGrid();
}

//pause // пауза
function togglePlayPause() {
    if (isPlaying) {
        clearInterval(intervalId);
        playPauseButton.textContent = "Play";
    } else {
        intervalId = setInterval(updateGrid, 100); // 1000 = 1 сек // 1000 = 1sec
        playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}
renderGrid();

//EventListener // евент лисенер 
playPauseButton.addEventListener("click", togglePlayPause);


//to be able to click // щоб клацати можна було
el.addEventListener("click", function(event){
    let rowI = Array.from(el.children).indexOf(event.target.parentNode);
    let colI = Array.from(event.target.parentNode.children).indexOf(event.target);
    if(matrix[rowI][colI] === 0){
        matrix[rowI][colI] = 1;
    } else {
        matrix[rowI][colI] = 0;
    }
    renderGrid();
});
