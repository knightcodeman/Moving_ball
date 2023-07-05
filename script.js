
    // Fetch the canvas element and get its context
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Set ball properties
    const ballRadius = 20;
    const ballColor = 'red';

    // Initialize ball position randomly within the canvas
    let ballX = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
    let ballY = Math.random() * (canvas.height - 2 * ballRadius) + ballRadius;

    // Set initial ball velocity to zero
    let ballDX = 0;
    let ballDY = 0;

    // Register event listeners for keydown and keyup events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Event handler for keydown event
    function handleKeyDown(event) {
      if (event.key === 'w') {
        ballDY = -10; // Move up
      } else if (event.key === 'a') {
        ballDX = -10; // Move left
      } else if (event.key === 's') {
        ballDY = 10; // Move down
      } else if (event.key === 'd') {
        ballDX = 10; // Move right
      }
    }

    // Event handler for keyup event
    function handleKeyUp(event) {
      if (event.key === 'w' || event.key === 's') {
        ballDY = 0; // Stop vertical movement
      } else if (event.key === 'a' || event.key === 'd') {
        ballDX = 0; // Stop horizontal movement
      }
    }

    // Update the ball position based on velocity
    function update() {
      ballX += ballDX;
      ballY += ballDY;

      // Keep the ball inside the canvas
      ballX = Math.max(ballRadius, Math.min(ballX, canvas.width - ballRadius));
      ballY = Math.max(ballRadius, Math.min(ballY, canvas.height - ballRadius));
    }

    // Draw the ball on the canvas
     function draw() {
      // Clear the canvas to prevent trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ballColor;
      ctx.fill();
      ctx.closePath();
    }

    // The game loop - continuously update and draw the ball
    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop); // Calls the gameLoop function repeatedly
    }

    // Start the game loop when the page loads
    gameLoop();