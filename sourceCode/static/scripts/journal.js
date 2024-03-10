const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('canvasTextInput');

textInput.style.zIndex = 100;

let painting = false;
let isTextMode = true;
let currentText = {
    text: '',
    x: 50,
    y: 50,
    font: '16px sans-serif',
    color: '#000',
    bold: false,
    italic: false,
    underline: false,
};

const initializeCanvas = () => {
    ctx.fillStyle = "#fbe5cf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateFont();
};

const resizeCanvas = () => {
    const toolbarOffset = 60;
    canvas.width = window.innerWidth - toolbarOffset;
    canvas.height = window.innerHeight - document.querySelector('header').offsetHeight;
    initializeCanvas();
};

const updateFont = () => {
    const {italic, bold, font, color} = currentText;
    ctx.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${font}`;
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
};

const drawText = () => {
    console.log('Drawing text:', currentText);
    updateFont();
    ctx.fillText(currentText.text, currentText.x, currentText.y);
    // Draw underline if needed
    if (currentText.underline) {
        const textWidth = ctx.measureText(currentText.text).width;
        ctx.beginPath();
        ctx.moveTo(currentText.x, currentText.y + 3); // Adjust underline position as needed
        ctx.lineTo(currentText.x + textWidth, currentText.y + 3);
        ctx.strokeStyle = currentText.color;
        ctx.stroke();
    }
};

// Toolbar action handlers
const toggleTextProperty = (property) => {
    currentText[property] = !currentText[property];
    drawText(); // Redraw text with updated styling
};

document.getElementById('btnBold').addEventListener('click', () => toggleTextProperty('bold'), console.log('Bold Button Clicked'));
document.getElementById('btnItalic').addEventListener('click', () => toggleTextProperty('italic'));
document.getElementById('btnUnderline').addEventListener('click', () => toggleTextProperty('underline'));
document.getElementById('fontStyle').addEventListener('change', (e) => {
    currentText.font = e.target.value;
    updateFont();
    drawText();
});
document.getElementById('fontColor').addEventListener('input', (e) => {
    currentText.color = e.target.value;
    updateFont();
    drawText();
});

// Handling text input on the canvas
canvas.addEventListener('click', (e) => {
    console.log('Click Detected');
    if (!isTextMode) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the position for the text input
    textInput.style.position = 'absolute';
    textInput.style.left = `${x}px`;
    textInput.style.top = `${y}px`;

    // Show the text input and focus it
    textInput.style.display = 'block';
    textInput.focus();
});


textInput.addEventListener('blur', () => {
    const text = textInput.value;
    if (!text) return;

    const rect = canvas.getBoundingClientRect();
    const x = parseFloat(textInput.style.left) - rect.left;
    // Parse the font size from the currentText.font, assumed to be in the form "16px sans-serif"
    const fontSize = parseInt(currentText.font.match(/\d+/), 10);
    const y = parseFloat(textInput.style.top) - rect.top + fontSize; // Adjust y to account for font size

    // Set the text properties for drawing
    currentText.text = text;
    currentText.x = x;
    currentText.y = y;

    drawText();

    // Hide the textInput and clear its value
    textInput.style.display = 'none';
    textInput.value = '';
});
    

// Painting handlers
const handlePainting = (e) => {
    if (isTextMode || !painting) return;
    const {left, top} = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - left, e.clientY - top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - left, e.clientY - top);
};

canvas.addEventListener('mousedown', () => painting = !isTextMode);
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mousemove', handlePainting);
canvas.addEventListener('mouseleave', () => painting = false);

window.addEventListener('resize', resizeCanvas);

initializeCanvas();


function initializeJournalPage() {
    // Assuming your journal page-specific logic is encapsulated here
    console.log("Journal page initialization logic called.");
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('canvasTextInput');

    textInput.style.zIndex = 100;

    let painting = false;
    let isTextMode = true;
    let currentText = {
        text: '',
        x: 50,
        y: 50,
        font: '16px sans-serif',
        color: '#000',
        bold: false,
        italic: false,
        underline: false,
    };

    const initializeCanvas = () => {
        ctx.fillStyle = "#fbe5cf";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        updateFont();
    };

    const resizeCanvas = () => {
        const toolbarOffset = 60;
        canvas.width = window.innerWidth - toolbarOffset;
        canvas.height = window.innerHeight - document.querySelector('header').offsetHeight;
        initializeCanvas();
    };

    const updateFont = () => {
        const {italic, bold, font, color} = currentText;
        ctx.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${font}`;
        ctx.fillStyle = color;
        ctx.textBaseline = "top";
    };

    const drawText = () => {
        console.log('Drawing text:', currentText);
        updateFont();
        ctx.fillText(currentText.text, currentText.x, currentText.y);
        // Draw underline if needed
        if (currentText.underline) {
            const textWidth = ctx.measureText(currentText.text).width;
            ctx.beginPath();
            ctx.moveTo(currentText.x, currentText.y + 3); // Adjust underline position as needed
            ctx.lineTo(currentText.x + textWidth, currentText.y + 3);
            ctx.strokeStyle = currentText.color;
            ctx.stroke();
        }
    };

    // Toolbar action handlers
    const toggleTextProperty = (property) => {
        currentText[property] = !currentText[property];
        drawText(); // Redraw text with updated styling
    };
    initializeCanvas();

    document.getElementById('btnBold').addEventListener('click', () => toggleTextProperty('bold'), console.log('Bold Button Clicked'));
    document.getElementById('btnItalic').addEventListener('click', () => toggleTextProperty('italic'));
    document.getElementById('btnUnderline').addEventListener('click', () => toggleTextProperty('underline'));
    document.getElementById('fontStyle').addEventListener('change', (e) => {
        currentText.font = e.target.value;
        updateFont();
        drawText();
    });
    document.getElementById('fontColor').addEventListener('input', (e) => {
        currentText.color = e.target.value;
        updateFont();
        drawText();
    });

    // Handling text input on the canvas
    canvas.addEventListener('click', (e) => {
        console.log('Click Detected');
        if (!isTextMode) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // Set the position for the text input
        textInput.style.position = 'absolute';
        textInput.style.left = `${x}px`;
        textInput.style.top = `${y}px`;
    
        // Show the text input and focus it
        textInput.style.display = 'block';
        textInput.focus();
    });
    

    textInput.addEventListener('blur', () => {
        const text = textInput.value;
        if (!text) return;

        const rect = canvas.getBoundingClientRect();
        const x = parseFloat(textInput.style.left) - rect.left;
        // Parse the font size from the currentText.font, assumed to be in the form "16px sans-serif"
        const fontSize = parseInt(currentText.font.match(/\d+/), 10);
        const y = parseFloat(textInput.style.top) - rect.top + fontSize; // Adjust y to account for font size

        // Set the text properties for drawing
        currentText.text = text;
        currentText.x = x;
        currentText.y = y;

        drawText();

        // Hide the textInput and clear its value
        textInput.style.display = 'none';
        textInput.value = '';
    });
        

    // Painting handlers
    const handlePainting = (e) => {
        if (isTextMode || !painting) return;
        const {left, top} = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - left, e.clientY - top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - left, e.clientY - top);
    };

    canvas.addEventListener('mousedown', () => painting = !isTextMode);
    canvas.addEventListener('mouseup', () => painting = false);
    canvas.addEventListener('mousemove', handlePainting);
    canvas.addEventListener('mouseleave', () => painting = false);

    window.addEventListener('resize', resizeCanvas);

    };

