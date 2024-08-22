// Existing Tic-Tac-Toe Game Code

document.addEventListener('DOMContentLoaded', function() {
    let squares = document.querySelectorAll('.square');
    let opponentChoice = document.querySelectorAll('input[name="opponent"]');
    let results = document.querySelector('#results');
    let resetButton = document.querySelector('#reset');
    let player1 = "X";
    let player2 = "O";
    let currentPlayer = player1;
    let gameOver = false;
    let selectedOpponent = null;
    let unbeatableAI = false;

    for (let i = 0; i < opponentChoice.length; i++) {
        opponentChoice[i].addEventListener('change', function() {
            selectedOpponent = this.value;
            unbeatableAI = (selectedOpponent === 'unbeatable');
            resetGame();
        });
    }

    function resetGame() {
        squares.forEach(square => square.textContent = '');
        results.textContent = '';
        gameOver = false;
        currentPlayer = player1;
    }

    function switchPlayers() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkWin() {
        let winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winCombinations.length; i++) {
            let [a, b, c] = winCombinations[i];
            if (
                squares[a].textContent === currentPlayer &&
                squares[b].textContent === currentPlayer &&
                squares[c].textContent === currentPlayer
            ) {
                results.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
                return;
            }
        }
        let draw = [...squares].every(square => square.textContent !== "");
        if (draw && !gameOver) {
            results.textContent = "It's a draw!";
            gameOver = true;
        }
    }

    function minimax(board, depth, isMaximizing) {
        let scores = { [player1]: -10, [player2]: 10, draw: 0 };
        let winner = checkWinner(board);
        if (winner !== null) return scores[winner];

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player2;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player1;
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner(board) {
        let winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winCombinations.length; i++) {
            let [a, b, c] = winCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.every(square => square !== '') ? 'draw' : null;
    }

    function computerMove() {
        let board = Array.from(squares).map(square => square.textContent);
        let bestScore = unbeatableAI ? -Infinity : 0;
        let bestMove = null;

        if (unbeatableAI) {
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player2;
                    let score = minimax(board, 0, false);
                    board[i] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }
        } else {
            let openSquares = [...squares].filter(square => square.textContent === "");
            let randomIndex = Math.floor(Math.random() * openSquares.length);
            bestMove = Array.from(squares).indexOf(openSquares[randomIndex]);
        }

        if (bestMove !== null) {
            squares[bestMove].textContent = player2;
            checkWin();
            switchPlayers();
        }
    }

    function handleClick(e) {
        if (gameOver) {
            results.textContent = "Please reset the game.";
            return;
        }
        if (selectedOpponent === null) {
            results.textContent = "Please choose an opponent first.";
            return;
        }
        if (e.target.textContent === "" && !gameOver) {
            e.target.textContent = currentPlayer;
            checkWin();
            switchPlayers();
            if (selectedOpponent === "computer" || selectedOpponent === "unbeatable") {
                computerMove();
            }
        }
    }

    squares.forEach(square => square.addEventListener("click", handleClick));
    resetButton.addEventListener("click", function() {
        resetGame();
    });
});

// New Code for Image Slider and Modal

document.addEventListener('DOMContentLoaded', function() {
    // Array to keep track of the images in the slider
    const images = [
        '../assets/img/projects/iot/car-c.jpg',
        '../assets/img/projects/iot/car1-c.jpg',
        '../assets/img/projects/iot/car2-c.jpg',
        '../assets/img/me/me_car.jpg'
    ];

    let currentIndex = 0;

    // Function to open the click-to-enlarge modal
    window.openClickFunction = function(index) {
        currentIndex = index;
        const clickFunction = document.getElementById('myClickFunction');
        const img = document.getElementById('clickFunctionImg');
        img.src = images[currentIndex];
        clickFunction.style.display = 'block';
    }

    // Function to close the click-to-enlarge modal
    window.closeClickFunction = function() {
        document.getElementById('myClickFunction').style.display = 'none';
    }

    // Function to show the previous image
    window.prevImage = function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        document.getElementById('clickFunctionImg').src = images[currentIndex];
    }

    // Function to show the next image
    window.nextImage = function() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        document.getElementById('clickFunctionImg').src = images[currentIndex];
    }

    // Start the image slider
    let sliderCurrentIndex = 0;
    const slider = document.querySelector('.slider');
    const sliderImages = document.querySelectorAll('.slider img');
    const totalSliderImages = sliderImages.length;
    const sliderImageWidth = sliderImages[0].clientWidth; // Width of one image

    function nextSliderImage() {
        sliderCurrentIndex = (sliderCurrentIndex + 1) % totalSliderImages;
        const offset = -sliderCurrentIndex * sliderImageWidth;
        slider.style.transform = `translateX(${offset}px)`;
    }

    function startSlider() {
        setInterval(nextSliderImage, 6000); // Change image every 6 seconds
    }

    startSlider();

    // Add event listener for the 'keydown' event to close the modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') { // 'Escape' is the key for the Esc key
            closeClickFunction();
        }
    });
});
